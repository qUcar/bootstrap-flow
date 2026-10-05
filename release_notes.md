# Bootstrap Flow v2.0.0

## Changes

- Required-field copy gates and an approved-plan gate for Bootstrap.
- Visible save/copy failures, save retry and manual copy guidance.
- Versioned v2 profile storage with validated v1 migration; corrupt data is preserved until explicit recovery.
- Up to 100 local projects with JSON import/export, strict schema validation and a 2 MB import limit.
- Versioned bilingual prompts; approved plans carry into validation.
- Explicit external-agent trust boundary and evidence-based filesystem verification instructions.
- Offline single-HTML delivery, no backend, no LLM calls and no production dependencies.

## Usage

Download index.html and open it in your browser, or use the GitHub Pages demo. Existing local profiles migrate on the next successful save. JSON exports may contain sensitive project text; review before sharing.

## Validation and limitations

Build, syntax checks and all 48 tests passed locally. Browser smoke checks covered copy gates, copying, project switching, reload persistence, JSON import and 375/768/1280/1440 px layouts. The in-app browser did not report JSON download completion; direct file opening and full cross-browser/accessibility verification remain unverified. See VALIDATION.md for exact checks. External agent actions still require review; this application cannot enforce filesystem permissions or guarantee preservation.
