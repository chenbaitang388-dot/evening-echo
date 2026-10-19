const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,'story/characters.js'),'utf8').replace('window.VN=','var VN=window.VN='),ctx);
for(const [,file]of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/src="(story\/[^"]+\.js)"/g)){if(file!=='story/characters.js')vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);}
const v=ctx.window.VN;
fs.writeFileSync(path.join(root,'work','current-story.json'),JSON.stringify(v,null,2));
const hits=[];for(const n of Object.values(v.nodes))for(const [i,l]of n.lines.entries())if(/攻略|好感度|六个人|人生|学会|这不是|而是|结局|路线|原谅|意义|选择一个/.test(l.text))hits.push([n.id,i,l.text]);
console.log(JSON.stringify(hits,null,2));