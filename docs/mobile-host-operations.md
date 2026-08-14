# Mobile Host Operations

Mission Control treats iOS and Pixel devices as AEGENTIX presence/execution nodes.

Node states: `PROVISIONING`, `ONLINE`, `OFFLINE`, `RECONCILING`, `QUARANTINED`, `UNKNOWN`.

A host may report telemetry, receive approved commands, acknowledge events, and reconcile its local journal. It may not elevate its own authority or bypass Guardian decisions.

## Provisioning
1. Generate/receive a node enrollment challenge from AEGENTIS CORE.
2. Establish a device-backed or platform-protected local credential.
3. Register platform and application version.
4. Establish authenticated transport.
5. Emit a `heartbeat` and `node_registered` event.
6. Enter `ONLINE` only after CORE acknowledgement.

## Offline behavior
Queue signed/validated events locally. Do not claim server-side state until reconciliation succeeds. Conflicts become `UNKNOWN` and require CORE reconciliation.
