// Explicit, character-specific direction. Never infer attraction from a smile.
(()=>{
const directions={
  "lin": {
    "signature": "guarded",
    "direction": "克制审视；视线先停一下，回答短而准确。亲近时是嘴角放松，不是固定脸红。生气时减少解释，不能用撒娇代替。"
  },
  "xu": {
    "signature": "composed",
    "direction": "礼貌而有主张；笑容可能表示维持体面或拒绝，不自动表示喜欢。独处疲惫时可以卸下笑容，真正开心时不必始终端着。"
  },
  "tang": {
    "signature": "laugh",
    "direction": "开怀笑时眼睛收起、肩膀放松；直率但不是永远高兴。失落时允许不说话，不用夸张笑脸掩盖受伤或疲惫。"
  },
  "shen": {
    "signature": "thinking",
    "direction": "细微的挑眉与停顿，幽默含在句尾；不固定成温柔微笑。遇到越界会冷下来，动心也可能先认真追问。"
  },
  "gu": {
    "signature": "confused",
    "direction": "困惑来自正在理解具体话意，不能把所有社交都写成呆萌。熟悉的事上会明确、自信；听懂玩笑之后才放松。"
  },
  "zhou": {
    "signature": "wry",
    "direction": "侧目、小幅歪笑、短句调侃；真正受伤时会收起笑，认真亲近时可以直视。不要把每句话都演成嘲讽。"
  }
};
for(const [id,d] of Object.entries(directions)){const c=VN.characters[id];c.expressionDirection=d.direction;c.expressions={neutral:'assets/'+id+'.png',smile:'assets/'+id+(['lin','shen','zhou'].includes(id)?'-alt':'')+'.png',serious:'assets/'+id+(['xu','gu','tang'].includes(id)?'-alt':'')+'.png',[d.signature]:'assets/'+id+'-'+d.signature+'.png'};}
})();
