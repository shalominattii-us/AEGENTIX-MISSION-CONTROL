import type {Plugin} from './types.js';
import {StarshipRuntime} from './runtime.js';
export class CybergeneticMarketplace{constructor(private runtime:StarshipRuntime){} publish(p:Plugin){if(!p.id||!p.name||!p.developer)throw new Error('invalid_plugin');if(p.trust==='VERIFIED'&&!p.contractUrl)throw new Error('verified_plugin_requires_contract');this.runtime.registerPlugin(p);return p;} search(q:string){return [...this.runtime.plugins.values()].filter(p=>`${p.name} ${p.developer} ${p.capabilities.join(' ')}`.toLowerCase().includes(q.toLowerCase()));}}
