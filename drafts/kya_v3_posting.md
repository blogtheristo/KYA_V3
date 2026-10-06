# KYA v3 — Know Your Agent v3

Risto Anton  
Lifetime Oy  
6 October 2026  
onelifetime.world/blog

An agent is allowed to act. Who checks what it may do?

Agents are moving into systems where actions have consequences. They read production data, they prepare decisions, and in some environments they act. That raises a question that is easy to ask in a meeting and hard to answer afterwards: what was this agent allowed to do, and who checked?

The check has to be possible without trusting the party that built the agent. That is the reason KYA v3 is public.

---

## What is open

KYA v3 is the specification. It defines agent rights: what an agent may do, in relation to what resources, under what limits and with which human decision behind it. The specification is open (Apache-2.0) so anyone can verify it.

Part of what an agent is allowed to do is already available in this repository:
- Agent permission definitions (`agent-rights/`)
- Access control framework (KYA-defined specification)
- Rights verification protocols (KYA-defined specification for checking an agent's rights, not the implementation)

---

## What is proprietary (Lifetime Oy)

The enforcement (how rights are executed), capability constraints (where rights may be exercised), and evidence chain (what remains after decisions) are proprietary to Lifetime Oy:
- **Themis:** Legal reasoning engine (how rights are enforced)
- **Capacity Class:** Where rights may be exercised (deployment constraints: resource limits, capability thresholds, operational boundaries)
- **Aegis:** Full sovereignty layer (execution + compliance evidence chain)

These are part of the implementation you receive under your contract with Lifetime Oy. The source code is not shared, but you receive a license to use the deployed solution within your own operations.

---

## Why open specification

Agent rights must be checkable regardless of who built the agent. This ensures interoperability and trust. If you have concerns about what an agent may do, you can verify the specification without involving Lifetime Oy. If you have concerns about how rights are enforced or how evidence is preserved, you rely on your contract with Lifetime Oy.

The specification being open does not mean the implementation is open. It means the rules are visible so they can be scrutinized. The enforcement and evidence remain proprietary because they contain Lifetime Oy's technology and the responsibility for outcomes.

---

**Specification:** https://github.com/blogtheristo/KYA_V3  
**Implementation:** Provided under your Lifetime Oy contract

---

KYA v3 is open so that anyone can check what an agent is allowed to do. What is not open is how those rights are enforced, how they are proved and who carries the liability. The specification is public; the execution and the evidence are not.