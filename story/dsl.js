// Authoring helper: one line per beat; `speaker~expression|dialogue` is optional.
VN.scene=function(id,chapter,bg,cast,music,text,next,choices,extra={}){
 const lines=text.trim().split('\n').map(x=>x.trim()).filter(Boolean).map(x=>{const p=x.indexOf('|');if(p<0)return x;const [who,expression='neutral']=x.slice(0,p).split('~');return[who,x.slice(p+1),expression];});
 VN.add(id,chapter,bg,cast,music,lines,next,choices,extra);
};
VN.catalogue={version:2,edition:'秋日长篇修订',start:'v2_opening'};
