import {createHash} from 'node:crypto';
import type {CyberEvent,DNA,Intent} from './types.js';

export const DNA_VERSION='CG-DNA-0.1' as const;
export function makeDNA(identity:string,authority:1|2|3|4|5,capabilities:string[],policyDomain='GENERAL',humanApprovalRequired=true):DNA{return {version:DNA_VERSION,identity,lineage:'AEGENTIX-SYNAPSE',capabilities,authority,policyDomain,telemetryRequired:true,humanApprovalRequired};}
export function canonical(v:unknown):string{return JSON.stringify(v,(k,val)=>val&&typeof val==='object'&&!Array.isArray(val)?Object.fromEntries(Object.entries(val).sort(([a],[b])=>a.localeCompare(b))):val);}
export function hashEvent(e:Omit<CyberEvent,'hash'>):string{return createHash('sha256').update(canonical(e)).digest('hex');}
export function createEvent(source:string,subject:string,intent:Intent,action:string,payload:Record<string,unknown>,dna:DNA,parentId:string|null):CyberEvent{const base={id:`EVT-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,ts:new Date().toISOString(),source,subject,intent,action,payload,parentId,dna};return {...base,hash:hashEvent(base)};}
