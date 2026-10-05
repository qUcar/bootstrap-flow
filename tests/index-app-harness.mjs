import { readFile } from "node:fs/promises";
import vm from "node:vm";

const createClassList = () => {
  const names = new Set();

  return {
    add: (...values) => values.forEach((value) => names.add(value)),
    contains: (value) => names.has(value),
    remove: (...values) => values.forEach((value) => names.delete(value)),
    toggle: (value, force) => {
      const shouldAdd = force ?? !names.has(value);
      names[shouldAdd ? "add" : "delete"](value);
      return shouldAdd;
    },
  };
};

const createElement = () => ({
  listeners: {},
  addEventListener(name, handler) { this.listeners[name] = handler; },
  async dispatch(name, extra = {}) { return this.listeners[name]?.({ target: this, ...extra }); },
  appendChild: () => {},
  checked: false,
  classList: createClassList(),
  dataset: {},
  focus: () => {},
  remove: () => {},
  select: () => {},
  setAttribute: () => {},
  style: {},
  textContent: "",
  value: "",
});

const createDocument = () => {
  const elements = new Map();
  const infos = Array.from({ length: 14 }, createElement);
  const languageButtons = ["tr", "en"].map((lang) => {
    const element = createElement();
    element.dataset.lang = lang;
    return element;
  });
  const copyButtons = Array.from({ length: 4 }, (_, index) => {
    const element = createElement();
    element.dataset.i = String(index);
    return element;
  });

  const getElementById = (id) => {
    if (!elements.has(id)) elements.set(id, createElement());
    return elements.get(id);
  };

  return {
    addEventListener: () => {},
    body: createElement(),
    createElement,
    documentElement: createElement(),
    execCommand: () => true,
    getElementById,
    querySelectorAll: (selector) => {
      if (selector === ".info") return infos;
      if (selector === ".copy-btn") return copyButtons;
      if (selector === "#lang-seg button") return languageButtons;
      if (selector === ".info.open") {
        return infos.filter((element) => element.classList.contains("open"));
      }
      return [];
    },
  };
};

const extractApplicationScript = (html) => {
  const matches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const applicationScript = matches.at(-1)?.[1];

  if (!applicationScript) {
    throw new Error("index.html içinde çalıştırılabilir uygulama scripti bulunamadı.");
  }

  return applicationScript;
};

const TEST_API = `
globalThis.__BOOTSTRAP_FLOW_TEST_API__ = {
  state: () => JSON.parse(JSON.stringify(state)),
  store: () => JSON.parse(JSON.stringify(profileStore)),
  save: () => save(),
  addProfile: (profile) => addProfile(profile),
  activateProfile: (id) => activateProfile(id),
  generate(profile, ui = {}) {
    state = {
      ui: { ...defaults().ui, ...ui },
      f: { ...defaults().f, ...profile },
    };
    buildSelects();
    applyLabels();
    renderPrompts();
    return [...prompts];
  },
};`;

export const loadIndexApplication = async (indexPath, overrides = {}) => {
  const html = await readFile(indexPath, "utf8");
  const document = createDocument();
  const storage = new Map();
  const sandbox = {
    confirm: () => true,
    console,
    document,
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
    navigator: { clipboard: { writeText: async () => {} } },
    setTimeout: () => 0,
    window: { matchMedia: () => ({ matches: false }) },
    ...overrides,
  };

  vm.createContext(sandbox);
  vm.runInContext(`${extractApplicationScript(html)}\n${TEST_API}`, sandbox, {
    filename: indexPath,
  });

  return { ...sandbox.__BOOTSTRAP_FLOW_TEST_API__, document, storage };
};
