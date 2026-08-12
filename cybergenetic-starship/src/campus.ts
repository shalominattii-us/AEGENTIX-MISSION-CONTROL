import type {CyberEvent} from './types.js';
import {StarshipRuntime} from './runtime.js';

export interface CampusNode{id:string;name:string;region:string;online:boolean;students:number;}
export class CampusFederation{readonly nodes=new Map<string,CampusNode>();constructor(readonly runtime:StarshipRuntime){} add(n:CampusNode){this.nodes.set(n.id,n);this.runtime.ingest('CAMPUS-FEDERATION',n.id,'OBSERVE','CAMPUS_REGISTERED',n,4,['READ_CAMPUS_STATE'],'CAMPUS');} broadcast(message:string,operator='OPERATOR'){const out:CyberEvent[]=[];for(const n of this.nodes.values())if(n.online)out.push(this.runtime.ingest(operator,n.id,'COMMUNICATE','CAMPUS_BROADCAST',{message},4,['SEND_CAMPUS_MESSAGE'],'COMMUNICATIONS'));return out;} attendance(nodeId:string,studentId:string,present:boolean){return this.runtime.ingest('ATTENDANCE',nodeId,'OBSERVE','ATTENDANCE_RECORDED',{studentId,present},2,['RECORD_ATTENDANCE'],'EDUCATION');}}
