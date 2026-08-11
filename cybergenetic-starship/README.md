# CYBERGENETIC STARSHIP v0.1

A physical cybernetic systems reference runtime built as an adapter layer around the frozen AEGENTIX Synapse/Event Bus.

## Non-negotiable invariant

Operator Intent -> Event Bus -> Agent Federation -> Governance -> Operator Approval when required -> Execution -> Telemetry -> Immutable Record.

This package does **not** replace or mutate the frozen AEGENTIX foundation. It provides a governed integration boundary for the physical Starship class.

## Included

- Cybergenetic DNA identity, capability, authority and lineage
- SHA-256 event envelopes and parent chaining
- Conductor / Guardian / Memory / Voice registry bootstrap
- Human approval queue for control/execution actions
- Compact append-only flight/vehicle recorder (`CG-FDR-0.1`)
- Robotics and drone telemetry/command adapters
- Ableton/CYBERDAW MIDI adapter
- Campus federation, mass communication and attendance events
- Community plugin marketplace registry with contract/trust metadata
- Mixture-of-experts routing for music, robotics and education
- HTTP operator API: `/health`, `/snapshot`, `/recorder`, `/event`, `/approval/:id`
- End-to-end self-test

## Run

```bash
npm install
npm test
npm run build
npm start
```

Default API port: `8787`.

## Safety model

Observation and learning are non-destructive. Control and execution are governed and, by default, require operator approval. Device adapters emit events; they do not directly bypass the AEGENTIX governance chain.

## Production boundary

This is a reference implementation. Actual aircraft/drone/robot flight-recording hardware must be separately engineered, certified, qualified, and integrated against the applicable airworthiness, safety, electromagnetic, cybersecurity, and evidentiary requirements before operational deployment.
