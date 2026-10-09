# AGENTS.md — KYA v3 (public specification repository)

Rules for every agent (Claude Code, OpenCode, opencode-loop) working here. Governing standard:
`docs/DWS_REPOSITORY_STANDARD.md` in the private `blogtheristo/dws6` repository (class B: public
open-specification repository).

1. **The specification is public; the execution is not.** This repository holds the KYA v3
   specification, conformance checks, mappings and illustrations only. Code, database schema,
   deployment scripts, commands, host names, file paths, site pages, post drafts and evidence belong
   to the private platform repository. CI enforces it: `node scripts/check-public-boundary.mjs`.
2. **No secret values, ever** — not even examples that look real.
3. **Versioned changes.** A change to the specification comes with a `CHANGELOG.md` entry and a
   `VERSION` bump (semver).
4. **No compliance claims.** Write "supports" or "maps to" NIS2 / GDPR / EU AI Act, never
   "compliant" or "certified".
5. **Pull requests only.** No direct push to `main`. Branches: `claude/*`, `opencode/*`, `feature/*`.
6. **Publishing the KYA-S1 text into `spec/` needs the HIC's approval** (Lifetime Oy).
7. Handoffs: `.claude/handoffs/<branch>.md`. Loop task specs: `.claude/done/<branch>.json`.
