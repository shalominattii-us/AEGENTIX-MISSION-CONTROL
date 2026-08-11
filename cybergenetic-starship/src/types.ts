export type Authority = 1|2|3|4|5;
export type Decision = 'APPROVED'|'DENIED'|'ESCALATE'|'UNKNOWN';
export type Intent = 'OBSERVE'|'LEARN'|'COMMUNICATE'|'CREATE'|'CONTROL'|'EXECUTE';
export type AgentKind = 'CONDUCTOR'|'GUARDIAN'|'MEMORY'|'VOICE'|'EXPERT'|'DEVICE';

export interface DNA { version:'CG-DNA-0.1'; identity:string; lineage:string; capabilities:string[]; authority:Authority; policyDomain:string; telemetryRequired:boolean; humanApprovalRequired:boolean; }
export interface CyberEvent { id:string; ts:string; source:string; subject:string; intent:Intent; action:string; payload:Record<string,unknown>; parentId:string|null; hash:string; dna:DNA; decision?:Decision; }
export interface Agent { id:string; kind:AgentKind; role:string; authority:Authority; capabilities:string[]; health:'HEALTHY'|'DEGRADED'|'QUARANTINED'; heartbeat:string; }
export interface Approval { id:string; eventId:string; requestedBy:string; reason:string; status:'PENDING'|'APPROVED'|'DENIED'|'ESCALATED'; createdAt:string; decidedAt?:string; decidedBy?:string; }
export interface RecorderFrame { seq:number; ts:string; eventId:string; source:string; payload:Record<string,unknown>; hash:string; }
export interface Plugin { id:string; name:string; version:string; developer:string; capabilities:string[]; trust:'VERIFIED'|'REVIEW'|'UNVERIFIED'; contractUrl?:string; }
