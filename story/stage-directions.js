(()=>{
// Explicit per-line presence survives save/load without replaying prior lines.
function presence(id,start,end,cast){const n=VN.nodes[id],a=n.lines.findIndex(l=>l.text.startsWith(start)),b=end?n.lines.findIndex(l=>l.text.startsWith(end)):n.lines.length;if(a<0||b<=a)throw Error('Invalid stage span '+id);for(let i=a;i<b;i++)n.lines[i].cast=[...cast];}
presence('tang_3','门关上',null,['tang']);
presence('lin_2','晚饭送来时','我拆开筷子',['lin','shen']);
presence('zhou_days_4','唐序后来碰见队友',null,['zhou']);
presence('xu_days_5','她走到门口',null,['xu']);
presence('tang_days_7','周未路过来借碗','收拾时',['tang','zhou']);
})();
(() => {
VN.assets.laundryNight='assets/laundry-night.png';VN.locationNames.laundryNight='校园 / 夜间洗衣房';
VN.assets.printShop='assets/print-shop.png';VN.locationNames.printShop='校门外 / 打印店';
function span(id,start,end,extra){const n=VN.nodes[id],a=start?n.lines.findIndex(l=>l.text.startsWith(start)):0,b=end?n.lines.findIndex(l=>l.text.startsWith(end)):n.lines.length;if(a<0||b<=a)throw Error('Invalid direction '+id);for(let i=a;i<b;i++)Object.assign(n.lines[i],extra);}
span('lin_1','店里还开着','离开时',{bg:'printShop'});
span('zhou_4','洗衣房人很少',null,{bg:'laundryNight'});
span('zhou_resolve',null,null,{bg:'laundryNight'});
span('zhou_friend',null,'过了一阵',{bg:'laundryNight'});
span('zhou_miss',null,'后来仍在旧楼',{bg:'laundryNight'});
span('shen_3',null,null,{moods:{shen:'thinking'}});
span('shen_4','她说送审会暂缓','我说听见就行',{moods:{shen:'thinking'}});
span('gu_3',null,null,{moods:{gu:'serious'}});
span('gu_4',null,'我们选了很早',{moods:{gu:'serious'}});
span('zhou_3',null,null,{moods:{zhou:'serious'}});
span('zhou_4','她把耳机扶稳',null,{moods:{zhou:'smile'}});
span('zhou_resolve','这次倒计时',null,{moods:{zhou:'smile'}});
})();
// Guarded Zhou: direct gaze and lowered hands; never a flirtation cue.
VN.characters.zhou.expressions.serious='assets/zhou-guarded-v2.png';
for(const id of ['zhou_days_5','zhou_apologize','zhou_pause','zhou_1','zhou_3','zhou_breach']){for(const line of VN.nodes[id].lines)line.moods={...line.moods,zhou:'serious'};}

(() => {
VN.characters.tang.expressions.quiet='assets/tang-quiet-v2.png';
for(const [id,prefix] of [['tang_days_6','第二天她来找我'],['tang_1','我递给她纸巾'],['tang_3','门关上']]){
 const n=VN.nodes[id],start=n.lines.findIndex(l=>l.text.startsWith(prefix));if(start<0)throw Error('Missing Tang emotion cue '+id);
 for(let i=start;i<n.lines.length;i++)n.lines[i].moods={...n.lines[i].moods,tang:'quiet'};
}
})();
(() => {
VN.characters.xu.expressions.tired='assets/xu-tired-v2.png';
for(const [id,from,to] of [['xu_days_4','面包店的椅子','门口有人喊'],['xu_days_4','对方只是认错',null],['xu_4','父亲最后没带她走','第二天她回了电话']]){
 const n=VN.nodes[id],a=n.lines.findIndex(l=>l.text.startsWith(from)),b=to?n.lines.findIndex(l=>l.text.startsWith(to)):n.lines.length;if(a<0||b<=a)throw Error('Missing Xu emotion cue '+id);
 for(let i=a;i<b;i++)n.lines[i].moods={...n.lines[i].moods,xu:'tired'};
}
})();(() => {
VN.characters.gu.expressions.focused='assets/gu-focused-v2.png';
const g=VN.nodes.gu_days_2,stop=g.lines.findIndex(l=>l.text.startsWith('我说记住了'));
if(stop<1)throw Error('Missing Gu focus cue');
for(let i=0;i<stop;i++)g.lines[i].moods={...g.lines[i].moods,gu:'focused'};
const x=VN.nodes.xu_4,end=x.lines.findIndex(l=>l.text.startsWith('出发那天'));
if(end<1)throw Error('Missing Xu departure cue');
for(let i=0;i<end;i++)x.lines[i].bg='club';
})();
(() => {
VN.characters.lin.expressions.direct='assets/lin-direct-v2.png';
VN.characters.shen.expressions.firm='assets/shen-firm-v2.png';
const n=VN.nodes.lin_days_7,a=n.lines.findIndex(l=>l.text.startsWith('她愣了一下')),b=n.lines.findIndex(l=>l.text.startsWith('我想了半天'));
if(a<0||b<=a)throw Error('Missing Lin direct cue');
for(let i=a;i<b;i++)n.lines[i].moods={...n.lines[i].moods,lin:'direct'};
for(const line of VN.nodes.shen_breach.lines)line.moods={...line.moods,shen:'firm'};
const end=VN.nodes.shen_breach.lines.find(l=>l.text.startsWith('门关上以后'));if(!end)throw Error('Missing Shen exit');end.cast=[];
})();
// Explicit presence is authoritative even when an offscreen character speaks.
for(const line of VN.nodes.tang_days_8.lines.slice(3))line.cast=[];
for(const [id,prefix] of [['zhou_days_7','回到宿舍'],['lin_days_2b','回宿舍后']]){
const n=VN.nodes[id],start=n.lines.findIndex(l=>l.text.startsWith(prefix));
if(start<0)throw Error('Missing remote scene cue '+id);
for(let i=start;i<n.lines.length;i++){n.lines[i].cast=[];n.lines[i].bg='night';}
}
(() => {
Object.assign(VN.assets,{dormNight:'assets/dorm-room-night.png',lectureHall:'assets/lecture-hall.png',trackStands:'assets/track-stands.png'});
Object.assign(VN.locationNames,{dormNight:'宿舍 / 夜间',lectureHall:'教学楼 / 阶梯教室',trackStands:'运动场 / 看台'});
for(const id of ['lin_days_1','tang_days_8'])VN.nodes[id].bg='dormNight';
for(const line of VN.nodes.lin_days_1.lines)line.cast=[];
for(const [id,prefix]of [['zhou_days_7','回到宿舍'],['lin_days_2b','回宿舍后']]){
 const n=VN.nodes[id],a=n.lines.findIndex(l=>l.text.startsWith(prefix));if(a<0)throw Error('Missing dorm cue '+id);
 for(let i=a;i<n.lines.length;i++)n.lines[i].bg='dormNight';
}
VN.nodes.xu_days_9.bg='lectureHall';VN.nodes.tang_1.bg='trackStands';
})();