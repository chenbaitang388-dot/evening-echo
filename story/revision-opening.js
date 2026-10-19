(() => {
VN.previousSceneLengthsByRevision[11]=Object.fromEntries(Object.entries(VN.nodes).map(([id,n])=>[id,n.lines.length]));
const R=VN.rewrite;
R('v2_opening',`
手机熄屏前，陈寻最后一条消息跳出来：再往前，你就出校了。
我猛地转身，包上的钥匙扣勾住了一个早餐袋。对面的女生停住脚，先稳住两杯豆浆，再看我。
lin|别拉。你越着急，我的油条越短。
袋子解开时，油条已经折了一根。我说重新买一份，她看了看袋底。
lin|不用。反正也要折。
她空出一只手，指了指银杏树后面的旧楼。
lin|活动中心从那边进。地图标的门锁着。
我|你怎么知道我找那里？
lin|你刚才经过我两次。第二次还在念楼名。
二十岁，大二。我决定暂时不告诉她，自己去年也来过这里。
走出几步，她在后面补了一句：鞋带。
我蹲下去系好，没再回头看她是不是在笑。
三楼广播室的门上写着：敲门没反应就推，耳机戴着。
门里传来一声撞响。我推开门，一个短银发女生正从桌下退出来，捂着额头。
zhou|维修件放桌上。
我说自己来补志愿登记。她看看我空着的手，指向抽屉。
zhou|第二个。第三个是去年的。
第二个也是去年的。
她安静了两秒，把我抽出的表放回去，从手边文件夹里翻出一张新的。
zhou|刚才那条作废。以后直接问我。
我忍住笑，坐到空桌边。门又开了，拎早餐的女生看见我，脚步一顿。
lin|这次挺快。
zhou|认识？
lin|他差点把我早饭带去校医院。
我|我觉得你省略了对我有利的部分。
她把豆浆推给短发女生，自己撕开早餐袋。对方刚喝一口，立刻把杯子拿远。
zhou|我说想喝冰的。
lin|你说随便。
zhou|随便里面可以排除烫嘴。
我低头填表，写日期时卡住。借来的笔尖旁，一根手指轻轻点了点。
lin|十七号。
我问她怎么知道我要写十六。她看着纸上已经写出一半的“六”，没回答。
这次我先笑了。她收回手，终于补上姓名。
lin|林知夏，新闻系。
zhou|周未。周末的末少一横。
lin|你不这么说，他可能还不会写错。
周未把我的表拿过去，在签收栏旁写了自己的名字，推回来让我看清。我报了姓名，她抬头重复了一遍。
窗外车铃响起来。知夏把笔留在我手边，掰开那根断油条。周未伸手拿了一半，被她用纸袋托住掉下来的碎屑。
我把日期写好。这回没错。
`,{cast:['lin'],bg:'campus'});
R('v2_help',`
交完表，周未把椅子往后一推，从桌下拖出一箱海报。箱底擦过地板，声音听着就不轻。
zhou|一楼柜子腾出来了。你下去的时候，方便帮我扶一下门吗？
我看了眼时间。食堂的鸡腿一般撑不到十二点半。
知夏已经绕到箱子另一边，试了试分量。
lin|你赶时间就先去。我们分两趟。
周未松开手，让出通往门口的位置。借来的笔还在我手里，笔帽不知什么时候被我扣到了另一端。
`);
R('v2_lunch',`
周四中午，陈寻推荐的咖喱饭排了长队。我端着盘子找座位，一个短棕发女生把身旁的书包拿了下去。
tang|这儿没人。
坐下不到半分钟，空调风就钻进了我后领。我往前挪，她把盘子往自己那边收了收，给我腾地方。
tang|刚才我也坐这边。
我|那你怎么不提醒？
tang|怕你走。等会儿别人又来问一遍有没有人。
她说得坦然。我把椅子斜过来，终于躲开风口，第一口饭却辣得咳起来。
她推来纸巾，顺势看了一眼我盘里的红酱。
tang|你也听陈寻的？
我抬头。她指了指桌上的手机，群聊里一排人正在问同一个人要水钱。
tang|他发了好几个群。自己吃的面。
我正准备找他算账，过道里有人喊了一声“唐序”。周未端着汤，停在桌边。
tang|卡。
周未把饭卡交出来，刚想坐，唐序又伸出手。
tang|今天刷的呢？
zhou|明天请你。
tang|行。记住你自己说的。
周未坐到桌角，问我是不是认识唐序。我说刚认识，而且已经失去对这桌人的信任。
唐序笑出声，差点被自己的饭呛到。她抽了张纸，摆摆手，让我先别接着说。
周未把手机横过来。照片里是清空的旧箱子，底下压着一张演出门票。
zhou|翻出来的。周六旧物摊能摆。
tang|那盆薄荷呢？
zhou|盆能摆。
tang|你得写清楚，只卖盆。
我问薄荷怎么了。两个人同时开口，又同时指向对方。最后周未把手机收起来，说不谈这个。
吃完，唐序起身时扶了下桌沿，很快站稳，把书包甩到一侧肩上。周未还在低头捞汤里的海带。
tang|我去器材室。你别又忘了还碗。
周未举起碗，表示听见了。我的下一节课还有一个小时，刚才冻凉的后颈被门口的太阳一晒，舒服得不太想回教室。
`,{cast:['tang']});
const opening=VN.nodes.v2_opening;
const indoor=opening.lines.findIndex(l=>l.text.startsWith('三楼广播室'));
const zhou=opening.lines.findIndex(l=>l.text.startsWith('门里传来'));
const lin=opening.lines.findIndex(l=>l.text.startsWith('我忍住笑'));
if(indoor<0||zhou<0||lin<0)throw Error('Opening staging cue missing');
for(let i=indoor;i<opening.lines.length;i++){opening.lines[i].bg='club';opening.lines[i].cast=i<zhou?[]:i<lin?['zhou']:['lin','zhou'];}
const lunch=VN.nodes.v2_lunch,arrival=lunch.lines.findIndex(l=>l.text.startsWith('我正准备找他算账'));
if(arrival<0)throw Error('Lunch staging cue missing');
for(let i=arrival;i<lunch.lines.length;i++)lunch.lines[i].cast=['tang','zhou'];
VN.previousSceneLengthsByRevision[2]={...VN.previousSceneLengths};
VN.revisedScenes=[...new Set(VN.revisedScenes)];
VN.catalogue.revision=12;
})();