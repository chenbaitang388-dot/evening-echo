(()=>{const R=VN.rewrite;
R('zhou_days_7',`
热汤面吃完，外面突然下起大雨。我们挤在店门口，周未往墙边靠，我被屋檐漏下的水浇到肩膀。
她拽了拽我的袖子，让我站回来一点。
老板拿了两张矮凳给我们。我坐下，膝盖弯得很别扭，她看见就笑了。
她拿出手机，朝屋檐外晃了一下。
zhou|这个雨声还行。我录一小段？
我点头，替她把手机挪到不会溅水的地方。
她按下录音，问我刚才为什么一直看那张凳子。我讲起小时候坐塑料椅卡住腿，最后被父亲连人带椅子抬起来。
她没忍住，笑得几乎弯下腰。等我讲到父亲还想先拍照，她已经顾不上屋檐外的雨。
手机屏幕暗了。她看了一眼，按停，放回包里。
雨没很快停。我们坐在那里，说了些后来记不清的话。她的鞋尖靠着我的鞋，一直没挪开。
回到宿舍，我只来得及发一句到了。她回得很快，说自己也到了。
我把湿外套挂好，才看见她又补了一条：“那张照片，你爸最后拍了没有？”
`,{chapter:'周未 · 屋檐下面'});
R('tang_party_after',`
唐序把最后一袋垃圾扔掉，回来拍了拍手，问我想不想绕操场再走一圈。
周未从前面回头，说她先走。唐序叫她别把门反锁，又低头拨了一下包上的猫。
我说下一次别玩那盒牌了。她很快答应，说本来也缺规则。
走了几步，她又说，也不全是规则的事。
我看向她。她没看我，只把那只歪猫转正，转了两次，猫还是歪着。
回宿舍后，她把说明书拍给我，圈出了我当时说过、没人听的那一行。
下面写着：“这次看清了。”
我回她一个很夸张的批准表情。她发来一串问号，终于又像平时。
`,{chapter:'唐序 · 这次看清了'});
// Keep choice labels as concrete actions, not relationship lessons or score hints.
const labels={
 tang_days_4:['“刚才有点气。后来没那么气了。”','“你刚才为什么先看我？”','“先走吧，回去再说。”'],
 gu_days_2:['“那后天中午，一起吃饭？”','把那张检查单收好，认真道歉'],
 gu_days_6:['告诉她，我还在等下一次见面的时间','问她能不能坐十分钟'],
 zhou_days_5:['把那句“只是玩笑”咽回去，道歉','停下解释，问今天是否先到这里'],
 shen_days_3:['收起手机，坐到对面','承认自己怕冷场，才准备了路线']
};
for(const [id,texts]of Object.entries(labels)){const choices=VN.nodes[id].choices;if(choices.length!==texts.length)throw Error('Choice mismatch '+id);choices.forEach((c,i)=>c.text=texts[i]);}
// The rewritten Lin movie still takes place at the campus film society.
for(const id of ['lin_days_3','lin_movie_talk','lin_movie_difference'])VN.nodes[id].bg=id==='lin_days_3'?'club':'night';
// Remove a few explicit player-facing metacommentaries from retained passages.
const cuts=[
 '我没把这句话当成新的攻略提示，只把她喜欢这家店记在心里。',
 '她点头，没有把这个变化收成自己教育有方。',
 '我没有推回去，也没有把付款当成什么暗示。'
];
for(const n of Object.values(VN.nodes)){const lines=n.lines.filter(l=>!cuts.includes(l.text));if(lines.length!==n.lines.length){if(VN.previousSceneLengths[n.id]===undefined)VN.previousSceneLengths[n.id]=n.lines.length;n.lines=lines;if(!VN.revisedScenes.includes(n.id))VN.revisedScenes.push(n.id);}}
for(const [id,line,expression] of [["v2_opening",3,"guarded"],["v2_opening",38,"smile"],["v2_box",4,"wry"],["v2_lunch",6,"laugh"],["v2_xu_walk",1,"composed"],["tang_days_5",7,"smile"],["tang_days_9",11,"serious"]]){VN.nodes[id].lines[line].expression=expression;}
VN.assets.clothingShop='assets/clothing-shop.png';
VN.locationNames.clothingShop='旧街 / 服装店';
VN.nodes.xu_days_6.bg='clothingShop';
VN.revisedScenes=[...new Set(VN.revisedScenes)];
})();