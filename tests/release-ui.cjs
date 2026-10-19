const fs=require('fs'),path=require('path'),assert=require('assert');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),url='file:///'+path.join(root,'index.html').replaceAll('\\','/');
(async()=>{
 const c=await chromium.launchPersistentContext(path.join(root,'work','qa-release-'+Date.now()),{executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,viewport:{width:1366,height:768},acceptDownloads:true});
 try{
 const page=await c.newPage(),errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
 await c.addInitScript(()=>{const add=window.addEventListener.bind(window);window.addEventListener=(type,fn,opts)=>{if(type!=='beforeunload')add(type,fn,opts);};});
 await page.goto(url);await page.evaluate(()=>{localStorage.clear();localStorage.setItem('evening-echo-v2-settings',JSON.stringify({speed:0,autoDelay:0,bgm:0,sfx:0}));});await page.reload();
 const button=name=>page.getByRole('button',{name,exact:true});
 await button('回忆与鉴赏').click();assert.equal(await page.locator('#gallery-content button').count(),0);await button('关闭 ×').click();
 await button('开始故事').click();const start=await page.evaluate(()=>EveningEcho.snapshot());
 await button('已读快进').click();await page.waitForTimeout(180);assert.deepEqual(await page.evaluate(()=>EveningEcho.snapshot()),start);
 await button('快存').click();await page.locator('#dialogue').click();await button('快读').click();assert.deepEqual(await page.evaluate(()=>EveningEcho.snapshot()),start);
 await button('存档').click();await page.locator('#modal-body .card').filter({hasText:'存档 01'}).click();await button('关闭 ×').click();
 await page.locator('#dialogue').click();await button('读档').click();await page.locator('#modal-body .card').filter({hasText:'存档 01'}).click();assert.deepEqual(await page.evaluate(()=>EveningEcho.snapshot()),start);
 await button('存档').click();const download=page.waitForEvent('download');await button('导出当前存档').click();const file=path.join(root,'work','release-save-'+Date.now()+'.json');await(await download).saveAs(file);
 const exported=JSON.parse(fs.readFileSync(file,'utf8'));assert.equal(exported.game,'EveningEcho');assert.deepEqual(exported.state,start);
 await page.locator('input[type=file]').setInputFiles({name:'broken.json',mimeType:'application/json',buffer:Buffer.from('{"game":"bad"}')});await page.waitForTimeout(100);assert.deepEqual(await page.evaluate(()=>EveningEcho.snapshot()),start);
 await page.locator('input[type=file]').setInputFiles(file);await page.waitForFunction(()=>!document.querySelector('#modal').open);assert.deepEqual(await page.evaluate(()=>EveningEcho.snapshot()),start);
 await button('设置').click();await page.getByRole('slider',{name:'背景音乐',exact:true}).fill('0.17');await page.getByRole('slider',{name:'音效',exact:true}).fill('0.31');await button('关闭 ×').click();
 assert.deepEqual(await page.evaluate(()=>[Sound.volume,Sound.sfx]),[.17,.31]);await button('快存').click();await page.reload();await button('继续阅读').click();assert.deepEqual(await page.evaluate(()=>[Sound.volume,Sound.sfx]),[.17,.31]);
 await button('设置').click();await page.getByRole('slider',{name:'背景音乐',exact:true}).fill('0');await page.getByRole('slider',{name:'音效',exact:true}).fill('0');await button('关闭 ×').click();
 const assets=await page.evaluate(async()=>{const names=[...new Set([...Object.values(VN.assets),...Object.values(VN.characters).flatMap(c=>Object.values(c.expressions)),...Object.keys(VN.characters).map(id=>'assets/cg-'+id+'.png')])];for(const src of names){const im=new Image();im.src=src;await im.decode();if(!im.naturalWidth)throw Error('Empty image '+src);}return names.length;});
 const scan=[];
 for(const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1024,height:600},{width:390,height:844}]){
 await page.setViewportSize(viewport);
 const result=await page.evaluate(()=>{
  const problems=[];let lines=0,nodes=0;
  for(const n of Object.values(VN.nodes)){
   const state={...VNCore.fresh(),node:n.id,line:0,route:Object.keys(VN.characters).find(id=>n.id.startsWith(id+'_'))||null};
   localStorage.setItem('evening-echo-v2-slot-quick',JSON.stringify({game:'EveningEcho',scriptRevision:VN.catalogue.revision,state}));
   [...document.querySelectorAll('#toolbar button')].find(b=>b.textContent==='快读').click();nodes++;
   for(const [i,l]of n.lines.entries()){
    const t=document.querySelector('#text'),speaker=document.querySelector('#speaker');t.textContent=l.text;speaker.textContent=VN.characters[l.who]?.name||l.who;
    const rect=t.getBoundingClientRect(),d=document.querySelector('#dialogue').getBoundingClientRect();
    if(rect.left<0||rect.right>innerWidth+1||rect.bottom>innerHeight-50||d.top<58||t.scrollWidth>t.clientWidth+1)problems.push({node:n.id,line:i,rect:{top:d.top,bottom:rect.bottom}});
    lines++;
   }
  }
  return{nodes,lines,problems};
 });scan.push({viewport,...result});assert.equal(result.problems.length,0,JSON.stringify({viewport,problems:result.problems.slice(0,8)}));
 }
 await page.setViewportSize({width:1366,height:768});
  const choiceLayouts=[];
 for(const viewport of [{width:1366,height:768},{width:1024,height:600},{width:390,height:844}]){
 await page.setViewportSize(viewport);
 const choices=await page.evaluate(()=>{
 const problems=[];let checked=0;
 for(const n of Object.values(VN.nodes).filter(n=>n.choices?.length)){
 const state={...VNCore.fresh(),node:n.id,line:n.lines.length-1};
 localStorage.setItem('evening-echo-v2-slot-quick',JSON.stringify({game:'EveningEcho',scriptRevision:VN.catalogue.revision,state}));
 [...document.querySelectorAll('#toolbar button')].find(b=>b.textContent==='快读').click();document.querySelector('#dialogue').click();
 const r=document.querySelector('#choices').getBoundingClientRect(),d=document.querySelector('#dialogue').getBoundingClientRect();
 if(r.bottom>d.top-4||r.left<0||r.right>innerWidth)problems.push({node:n.id,bottom:r.bottom,dialogueTop:d.top});
 checked++;
 }return{checked,problems};
 });choiceLayouts.push({viewport,...choices});assert.equal(choices.problems.length,0,JSON.stringify({viewport,problems:choices.problems}));
 }
 const endings=await page.evaluate(()=>{
 const results=[];for(const n of Object.values(VN.nodes).filter(n=>n.ending)){
  const route=Object.keys(VN.characters).find(id=>n.id.startsWith(id+'_'))||'ensemble';
  localStorage.setItem('evening-echo-v2-slot-quick',JSON.stringify({game:'EveningEcho',scriptRevision:VN.catalogue.revision,state:{...VNCore.fresh(),node:n.id,line:n.lines.length-1,route}}));
  [...document.querySelectorAll('#toolbar button')].find(b=>b.textContent==='快读').click();document.querySelector('#dialogue').click();
  if(!EveningEcho.snapshot().ended||!EveningEcho.metadata().endings.includes(n.ending))throw Error('Ending failed '+n.id);
  results.push(n.ending);document.querySelector('#close-modal').click();
 }return results;
 });
 await page.locator('#toolbar').getByRole('button',{name:'标题',exact:true}).click();await button('回忆与鉴赏').click();assert.equal(await page.locator('#gallery-content button').count(),endings.length);
 assert(!/未解锁|Good End|Bad End|\d+\s*\/\s*\d+/.test(await page.locator('#gallery-content').innerText()));
 await button('画面鉴赏').click();await page.locator('#gallery-content img').evaluateAll(images=>Promise.all(images.map(im=>im.decode())));await button('关闭 ×').click();
 for(const [node,prefix,name]of [['lin_days_1','十点二十七分','dorm'],['xu_days_9','汇报那天','lecture'],['tang_1','看台比预想','track']]){
 await page.evaluate(({node,prefix})=>{const line=VN.nodes[node].lines.findIndex(l=>l.text.startsWith(prefix));if(line<0)throw Error('Missing screenshot cue');localStorage.setItem('evening-echo-v2-slot-auto',JSON.stringify({game:'EveningEcho',scriptRevision:VN.catalogue.revision,state:{...VNCore.fresh(),node,line,route:node.split('_')[0]}}));},{node,prefix});await page.reload();await button('继续阅读').click();await page.locator('#cast img').evaluateAll(images=>Promise.all(images.map(im=>im.decode())));await page.waitForTimeout(800);await page.screenshot({path:path.join(root,'docs','release-'+name+'.png')});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 const report={status:'passed',assetsDecoded:assets,layout:scan,choiceLayouts,endingChecks:endings.length,features:['manual save/load','quick save/load','export/import round trip','invalid import preserves state','unread skip protection','independent audio settings persist','only discovered endings displayed','CG gallery decoded','no network requests'],consoleErrors:errors};
 fs.writeFileSync(path.join(root,'docs','release-validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }finally{await c.close();}
})().catch(e=>{console.error(e);process.exitCode=1});