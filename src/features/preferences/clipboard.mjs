export const writeClipboard = async (text, navigatorObject, documentObject) => {
  try {
    await navigatorObject.clipboard.writeText(text);
    return true;
  } catch {
    const previousFocus = documentObject.activeElement;
    const textarea = documentObject.createElement("textarea");
    textarea.value = text;
    textarea.className = "clipboard-buffer";
    documentObject.body.appendChild(textarea);
    try {
      textarea.select();
      return documentObject.execCommand("copy") === true;
    } catch { return false; }
    finally { textarea.remove(); previousFocus?.focus(); }
  }
};
