# KYA v3 — Know Your Agent v3

Open specification for agent rights. Proprietary execution.

KYA v3 is open so that anyone can check what an agent is allowed to do. What is not open is how those rights are enforced, how they are proved and who carries the liability. The specification is public; the execution and the evidence are not.

## What's Open (Apache-2.0)

- Agent permission definitions (`agent-rights/`)
- Access control framework specification
- Rights verification protocols (KYA-defined specification for checking an agent's rights, not the implementation)

## What's Proprietary (Lifetime Oy)

- **Themis:** Legal reasoning engine (how rights are enforced)
- **Capacity Class:** Where rights may be exercised (deployment constraints: resource limits, capability thresholds, operational boundaries)
- **Aegis:** Full sovereignty layer (execution + compliance evidence chain)

## Why Open Specification?

Agent rights must be checkable regardless of who built the agent. This ensures interoperability and trust. The enforcement layer remains proprietary to guarantee accountability and liability assignment. Auditability is provided to customers via the compliance evidence chain.

---

## For Developers

This repository contains the KYA v3 **specification** (open, Apache-2.0). The **implementation** (DWS6/Aegis execution) is maintained privately by Lifetime Oy. Customers receive a license to use the deployed solution under their contracts; the source code is not shared.

License: Apache-2.0 (see LICENSE) | This license applies to the specification in this repository.

Implementation License: Lifetime Oy's implementation (DWS6/Aegis) is not in this repository. See `IMPLEMENTATION_LICENSE.md` for customer terms.