(() => {
VN.previousSceneLengthsByRevision[15]=Object.fromEntries(Object.entries(VN.nodes).map(([id,n])=>[id,n.lines.length]));
VN.rewrite('gu_honest',`
我说我在等她改约，只是不知道那顿饭还算不算。她把文件夹抱稳，反问我为什么不直接问。
我说怕催她。她往下看了一眼，像想起刚才那句冷冰冰的我知道。
gu|这样也挺像催的。
我没法反驳。她把散开的纸放好，问下周二中午行不行。
我说行。上课铃响了，她看向楼上，脚已经迈上一级，又转回来。
gu|你先把饭吃了。
我低头，才想起刚才还嘴硬说吃过。她指了指楼下的长椅，说这边风大，站着聊完，饭也凉了。
我问下周二去哪儿。她说下课再找，今天先把时间定下来。
她跑上楼。我到长椅上拆开外卖，手机里多了一条她发来的日期和时间，紧接着是三个字：别记错。
我照着记进日历，没有再回那句我知道。
`);
VN.previousSceneLengthsByRevision[2]={...VN.previousSceneLengths};
VN.revisedScenes=[...new Set(VN.revisedScenes)];
VN.catalogue.revision=16;
})();