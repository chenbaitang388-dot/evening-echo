// Narrative revision: preserve node IDs and route state; revise performance and prose.
VN.revisedScenes=[];
VN.previousSceneLengths={};
VN.rewrite=function(id,text,extra={}){
 const n=VN.nodes[id];if(!n)throw Error('Unknown revised scene '+id);
 if(VN.previousSceneLengths[id]===undefined)VN.previousSceneLengths[id]=n.lines.length;
 n.lines=text.trim().split('\n').map(x=>x.trim()).filter(Boolean).map(x=>{const p=x.indexOf('|');if(p<0)return{who:'',text:x};const [who,expression='neutral']=x.slice(0,p).split('~');return{who,text:x.slice(p+1),expression};});
 Object.assign(n,extra);VN.revisedScenes.push(id);
};
VN.catalogue.revision=3;
VN.catalogue.edition='秋日叙事修订';