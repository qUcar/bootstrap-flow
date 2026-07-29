# Bootstrap Flow

[![Status](https://img.shields.io/badge/status-alpha-orange.svg)]()

Türkçe: [README.tr.md](README.tr.md)

Bootstrap Flow is an offline, single-file prompt generator for bootstrapping software projects with coding agents such as Codex, Claude Code, and Cursor.

**Important Note**: Bootstrap Flow **does not contain or call an LLM**. It generates prompts locally for you to pass to your preferred coding agent.

## Live Demo
[https://qUcar.github.io/bootstrap-flow/](https://qUcar.github.io/bootstrap-flow/)

## How it works

This tool is a standalone HTML file that takes your project requirements via a form and generates a structured, multi-phase prompt sequence.

### Four-Phase Workflow

1. **Understand and plan**: The agent analyzes your project details and proposes an implementation plan. This generates no files and requires your explicit approval.
2. **Bootstrap**: Once you approve the Phase 1 plan, you paste it back into the generator. The agent then creates the necessary directories and core markdown files.
3. **Validate**: The agent validates the generated structure (preferably in a fresh session) and reports PASS/WARN/FAIL status.
4. **Resume and update**: Used when returning to an existing project. The agent reads tracking files to summarize the current state and proposes next steps without making unapproved changes.

## Features

- **Project Scales**: Choose between Quick (7 files), Standard (12 files), and Full (14 files) to match your project's complexity.
- **Bilingual Support**: Generates prompts in English or Turkish, with independent settings for the UI language and agent response language.
- **Privacy First**: Completely offline. All form data is stored locally in your browser's `localStorage`. No telemetry or backend.

## Local Usage

Simply open `index.html` in your browser. No internet connection is required.

## Development

The project is structured such that `src/features/` contains the prompt generation source of truth.

### Commands

```bash
# Build the single-file HTML artifact
npm run build

# Run syntax checks
npm run check

# Run tests
npm test

# Run full verification pipeline
npm run verify
```

## Architecture

Bootstrap Flow uses a DOM-independent prompt generation core (`src/features/`). The build process bundles these modules into a designated `PROMPT_CORE` region within `index.html`. It relies solely on built-in Node.js tools with no external production dependencies.

## Current Alpha Limitations

- Alpha status with limited real-world field testing.
- Profile import/export and multi-profile support are incomplete.
- Ongoing accessibility verification.
- Coding-agent output still requires user review.

## Roadmap Summary

Future updates (v2) will introduce project-specific file packages (e.g., vision -> CALIBRATION.md), JSON export/import for profiles, multi-profile support, and a template editing mode.

## Resources

- [Contributing](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)
- [License (MIT)](LICENSE)
