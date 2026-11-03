/* Biblioteca de archivos: lista la carpeta media/ del repositorio de GitHub Pages (o media/lista.json como respaldo). */
const Media={_c:null,tipo:n=>/\.(png|jpe?g|webp|gif|svg)$/i.test(n)?'imagen':'video',
 async lista(forzar){if(this._c&&!forzar)return this._c;let r=[];const ok=/\.(mp4|webm|mov|m4v|png|jpe?g|webp|gif|svg)$/i;
  try{const m=location.hostname.match(/^(.+)\.github\.io$/);if(!m)throw 0;const repo=location.pathname.split('/')[1],j=await(await fetch(`https://api.github.com/repos/${m[1]}/${repo}/contents/media`)).json();if(!Array.isArray(j))throw 0;r=j.filter(x=>x.type==='file'&&ok.test(x.name)).map(x=>x.name);}
  catch(e){try{r=(await(await fetch('media/lista.json?'+Date.now())).json()).filter(n=>ok.test(n));}catch(e2){r=[];}}
  return this._c=r;}};
