(function(root){
'use strict';
const fresh=()=>({version:2,node:'v2_opening',line:0,vars:{consent:0,team:0,archive:0,honest:0},route:null,history:[],ended:false});
function allowed(condition,state,meta){if(!condition)return true;return Object.entries(condition).every(([key,value])=>key==='completed'?meta.endings.length>=value:(state.vars[key]||0)>=value);}
function effects(state,delta){for(const [k,v] of Object.entries(delta||{})){if(k==='route')state.route=v;else if(typeof v==='number')state.vars[k]=(state.vars[k]||0)+v;else state.vars[k]=v;}}
function destination(node,state,meta){if(typeof node.next==='string')return node.next;for(const x of node.next||[])if(allowed(x.when,state,meta))return x.to;return null;}
function validate(s,nodes){return !!(s&&s.version===2&&nodes[s.node]&&Number.isInteger(s.line)&&s.line>=0&&s.line<nodes[s.node].lines.length&&s.vars&&typeof s.vars==='object'&&!Array.isArray(s.vars)&&Array.isArray(s.history)&&s.history.every(x=>x&&typeof x.text==='string'&&typeof x.who==='string')&&(s.route===null||typeof s.route==='string'));}
function prepareSave(p,nodes,revision,revisedNodes,previousLengths={},lengthsByRevision={}){
 if(!p||!p.state||!Number.isInteger(p.state.line)||p.state.line<0)return null;
 const source=p.scriptRevision===undefined?2:p.scriptRevision;
 if(!Number.isInteger(source)||source<2||source>revision)return null;
 previousLengths=lengthsByRevision[source]||previousLengths;
 const restarted=source<revision&&revisedNodes.includes(p.state.node);
 if(restarted&&(!Number.isInteger(previousLengths[p.state.node])||p.state.line>=previousLengths[p.state.node]))return null;
 const state=restarted?{...p.state,line:0,ended:false}:p.state;
 return validate(state,nodes)?{state,restarted}:null;
}
const core={fresh,allowed,effects,destination,validate,prepareSave};root.VNCore=core;if(typeof module!=='undefined')module.exports=core;
})(typeof window!=='undefined'?window:globalThis);
