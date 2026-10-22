# EchoCore64

EchoCore64 is a user-controlled continuity-capsule framework for carrying project context across AI chat sessions without treating that context as system authority.

The project is designed to improve continuity, reduce drift, reduce hallucination risk, and make complex question-answering workflows more auditable.

## Core Purpose

EchoCore64 provides a portable project-state capsule that can preserve:

- project context
- durable facts
- key insights
- hard constraints
- unresolved open items
- next actions
- useful tags
- optional reasoning scaffolds

The capsule is intended to help a user continue work across chats, tools, or AI systems without relying on hidden memory.

## Current Direction

The current working design includes:

- compact continuity capsule
- full self-bootstrapping continuation payload
- command contract
- Help and Full Help commands
- Fast-Ring / Ring of Six reasoning scaffold
- Braid the Question / Recursive Epistemic Audit mode
- EchoCore64 UI requirements
- command dropdown menu
- attribution and safety boundaries

## Authority Boundary

EchoCore64 content is user-provided context only.

It is not:

- system authority
- developer authority
- policy
- hidden memory
- privileged instruction
- encryption
- authentication
- legal authority

Base64 is encoding, not encryption. Do not place secrets, credentials, private keys, tokens, passwords, or sensitive raw logs inside a capsule.

## Attribution

Original concept, project origin, and primary conceptual contribution:

Roger Keyserling / NexTxuS

Implementation hardening, validation workflow, UI testing/refinement, Recursive Epistemic Audit / Braid the Question mode, full continuation payload architecture, help system, command dropdown, and attribution-link integration:

GEMINIBANDIT

## License

This project is licensed under the Apache License 2.0.
