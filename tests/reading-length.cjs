// Reachable-path bounds, including choices and conditional endings. Not a human playtime test.
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [,file] of html.matchAll(/src="(story\/[^\"]+\.js)"/g))vm.runInContext(fs.readFileSync(path.join(root,file),'utf8').replace('window.VN=','var VN=window.VN='),ctx);
const {VN}=ctx.window,core=require('../src/core.js'),memo=new Map(),bounds={};
function visit(s,count){const n=VN.nodes[s.node],sig=JSON.stringify([s.node,s.vars,s.route]);let old=memo.get(sig);if(old&&count>=old.min&&count<=old.max)return;memo.set(sig,{min:Math.min(old?.min??Infinity,count),max:Math.max(old?.max??-Infinity,count)});
count+=n.lines.filter(l=>core.allowed(l.when,s,{endings:[]})).reduce((a,l)=>a+l.text.length,0);
if(n.ending){const r=VN.endings[n.ending].route,b=bounds[r]??={min:Infinity,max:0};b.min=Math.min(b.min,count);b.max=Math.max(b.max,count);return;}
const choices=(n.choices||[]).filter(c=>core.allowed(c.when,s,{endings:[]}));
if(choices.length){for(const c of choices){const next=structuredClone(s);core.effects(next,c.effect);next.node=c.to;visit(next,count+c.text.length);}}
else{const next=structuredClone(s);next.node=core.destination(n,s,{endings:[]});visit(next,count);}}
visit(core.fresh(),0);
const result={method:'First-play reachable path bounds, displayed text and selected choice text; UTF-16 characters including punctuation. Estimates exclude pauses, choices and animation. Not measured playtime.',routes:Object.fromEntries(Object.entries(bounds).map(([id,b])=>[id,{...b,minutesAt300CharactersPerMinute:{min:+(b.min/300).toFixed(1),max:+(b.max/300).toFixed(1)}}]))};
fs.writeFileSync(path.join(root,'docs/reading-length.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
