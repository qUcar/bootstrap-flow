# Contributing to Bootstrap Flow

Thank you for your interest in contributing to Bootstrap Flow!

## Project Scope & Constraints
Bootstrap Flow is an offline, single-file prompt generator for bootstrapping software projects with coding agents. The primary product constraint is that it must remain a single `index.html` file with zero external runtime dependencies. 

**Critical Rules:**
- **No Embedded LLMs**: The tool generates prompts. It does not call any LLM API, nor does it contain a local LLM.
- **Offline-First**: All data is stored in the browser's local storage. No telemetrics or backend services are allowed.
- **Single File**: The final artifact must be a standalone `index.html`.

## Required Reading
Before contributing, please read the internal planning and architecture documents:
1. `PROJECT_BRIEF.md`
2. `REQUIREMENTS.md`
3. `DESIGN.md`
4. `STATUS.md`

## Development Workflow
The prompt generation source of truth is located in `src/features/`.
> **WARNING**: Never manually edit the `PROMPT_CORE` region inside `index.html`. It is generated automatically during the build process.

To build and verify the project, run:
```bash
npm run build
npm run verify
```

## Submitting Pull Requests
- Ensure your changes do not violate the offline, single-file, or LLM constraints.
- Run `npm run verify` before submitting.
- Update `TASKS.md` and `CHANGELOG.md` when relevant.
- All public-facing documentation and commit messages must be in English.
