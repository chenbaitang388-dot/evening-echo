(()=>{
 const previous=JSON.parse(localStorage.getItem('evening-echo-v2-slot-auto')||'null');
 const button=text=>[...document.querySelectorAll('button')].find(x=>x.textContent===text);
 const continued=!!previous;
 button(continued?'继续阅读':'开始故事').click();
 const before=EveningEcho.snapshot();
 if(continued&&JSON.stringify(before.vars)!==JSON.stringify(previous.state.vars))throw Error('Persistent save differs');
 document.querySelector('#dialogue').click();document.querySelector('#dialogue').click();
 button('快存').click();const quick=EveningEcho.snapshot();
 document.querySelector('#dialogue').click();document.querySelector('#dialogue').click();button('快读').click();
 const restored=EveningEcho.snapshot();if(restored.node!==quick.node||restored.line!==quick.line)throw Error('Quick load differs');
 EveningEcho.flush();
 return {status:'passed',nativeWindow:true,origin:location.origin,continuedFromPreviousLaunch:continued,quickSaveLoad:true,closeFlushRequested:true,node:restored.node,line:restored.line};
})();
