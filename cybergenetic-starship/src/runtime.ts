import type {Agent,CyberEvent,Decision,Approval,Plugin,Intent} from './types.js';
import {createEvent,hashEvent,makeDNA} from './dna.js';

export class StarshipRuntime {
  readonly agents=new Map<string,Agent>(); readonly events:CyberEvent[]=[]; readonly approvals=new Map<string,Approval>(); readonly plugins=new Map<string,Plugin>();
  register(agent:Agent){this.agents.set(agent.id,agent);}
  registerPlugin(p:Plugin){this.plugins.set(p.id,p);}
  ingest(source:string,subject:string,intent:Intent,action:string,payload:Record<string,unknown>,authority:1|2|3|4|5,capabilities:string[],policyDomain='GENERAL'){const dna=makeDNA(source,authority,capabilities,policyDomain,authority>=3); const parentId=this.events.at(-1)?.id??null; const e=createEvent(source,subject,intent,action,payload,dna,parentId); const decision=this.guard(e); e.decision=decision; this.events.push(e); if(decision==='ESCALATE'||decision==='UNKNOWN'){const a:Approval={id:`APR-${Date.now()}`,eventId:e.id,requestedBy:source,reason:`Governance required for ${action}`,status:'PENDING',createdAt:e.ts};this.approvals.set(a.id,a);} return e;}
  guard(e:CyberEvent):Decision{if(e.intent==='OBSERVE'||e.intent==='LEARN')return 'APPROVED';if(e.intent==='CREATE'&&e.dna.authority<4)return 'APPROVED';if(e.intent==='COMMUNICATE'&&e.dna.authority<4)return 'ESCALATE';if(e.intent==='CONTROL'||e.intent==='EXECUTE')return e.dna.humanApprovalRequired?'ESCALATE':'APPROVED';return 'UNKNOWN';}
  decide(id:string,status:'APPROVED'|'DENIED'|'ESCALATED',operator:string){const a=this.approvals.get(id);if(!a)throw new Error('approval_not_found');a.status=status;a.decidedAt=new Date().toISOString();a.decidedBy=operator;const e=this.events.find(x=>x.id===a.eventId);if(e)e.decision=status==='ESCALATED'?'ESCALATE':status;return a;}
  verify(e:CyberEvent){const {hash,...body}=e;return hash===hashEvent(body);}
  heartbeat(agentId:string){const a=this.agents.get(agentId);if(!a)throw new Error('agent_not_found');a.heartbeat=new Date().toISOString();a.health='HEALTHY';return a;}
  snapshot(){return {agents:[...this.agents.values()],events:this.events.slice(-100),pendingApprovals:[...this.approvals.values()].filter(a=>a.status==='PENDING'),plugins:[...this.plugins.values()]};}
}
