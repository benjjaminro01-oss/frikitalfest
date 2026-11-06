/* Salida OBS v2: capas por tipo; la nueva reemplaza a la anterior. */
const RAYO=c=>`<svg viewBox="0 0 60 110" class="rayo"><polygon points="34,0 4,62 26,62 16,110 56,40 34,40 46,0" fill="${c}" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>`;
const esc=s=>String(s??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const MARCA={'á':"'",'é':"'",'í':"'",'ó':"'",'ú':"'",'ü':'"','ñ':'~'};
function fx(s,up){s=String(s??'');if(up)s=s.toUpperCase();let h='';for(const ch of s){const l=ch.toLowerCase(),u=ch!==l;
  if(MARCA[l]){const b={'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u','ñ':'n'}[l];h+=`<span class="ac${u?' u':''}" data-m="${MARCA[l]==='"'?'&quot;':MARCA[l]}">${u?b.toUpperCase():b}</span>`;}
  else if(ch==='¿')h+='<span class="inv">?</span>';else if(ch==='¡')h+='<span class="inv">!</span>';
  else if(ch==='·')h+='<span class="pt"></span>';else if(ch==='ª'||ch==='º')h+=`<span class="sup">${ch==='ª'?'a':'o'}</span>`;
  else if(ch==='—'||ch==='–')h+='-';else h+=esc(ch);}return h;}
const estrellas=n=>Array.from({length:n},(_,i)=>`<b class="st" style="left:${(i*137.5)%100}%;top:${(i*61.8+i*i*3)%100}%;--s:${14+(i*7)%24}px;animation-delay:${(i*.37)%3}s"></b>`).join('');
function plantilla(g){
  const t=g.t||{};
  if(Object.values(t).some(v=>/PENDIENTE_/.test(v)))return null; // nunca a pantalla
  const col=`var(--${g.color||'magenta'})`;
  if(g.tipo==='carton'){const n=cartonDe(g,Estado.get());if(n){const u=blobs[n]||'media/'+encodeURIComponent(n);return /\.(png|jpe?g|webp|gif|svg)$/i.test(n)?`<div class="mov"><img src="${u}"></div>`:`<div class="mov"><video src="${u}" playsinline preload="auto" loop muted></video></div>`;}}
  if(g.tipo==='carton')return `<div class="carton t-${Estado.get().tema||'turquesa'}"><div class="rayos"></div><div class="rayos r2"></div><div class="puntos"></div><div class="destello"></div>${estrellas(26)}<div class="luna"></div><div class="rb r1">${RAYO('#E6177F')}</div><div class="rb r2">${RAYO('#1FA8F0')}</div><div class="rb r3">${RAYO('#E6177F')}</div><div class="rb r4">${RAYO('#1FA8F0')}</div><div class="logo"><svg viewBox="0 0 ${LOGO.w} ${LOGO.h}"><path class="la" fill-rule="evenodd" d="${LOGO.A}"/><path class="lf" fill-rule="evenodd" d="${LOGO.F}"/></svg><i>2026</i></div><div class="lema"><span class="l1">${fx('TU AVENTURA')}</span><em>GEEK</em><span class="l2">${fx('COMIENZA AQUÍ')}</span></div>${mascota(g)}<div class="pie">${fx('SÁBADO 7 DE NOVIEMBRE · SANTO TOMÁS TALCA')}</div></div>`;
  if(g.tipo==='titulo')return `<div class="titulo" style="--c:${col}"><div class="ic">${RAYO('#fff')}</div><div class="placa"><span>${fx(t.a,true)}</span></div><div class="subraya"></div><b class="st" style="right:-30px;top:-26px;--s:34px"></b><b class="st" style="right:40px;top:-40px;--s:20px;animation-delay:.6s"></b></div>`;
  if(g.tipo==='motion'){const n=t.src;if(!n)return null;const u=blobs[n]||'media/'+encodeURIComponent(n);return /\.(png|jpe?g|webp|gif|svg)$/i.test(n)?`<div class="mov"><img src="${u}"></div>`:`<div class="mov"><video src="${u}" playsinline preload="auto"></video></div>`;}
  if(g.tipo==='rotulo'){const ap=g.var==='apoyo',f=ap?'gc_apoyo.webm':'gc_nombre.webm',u=blobs[f]||'media/'+f,v=`<video src="${u}" muted playsinline preload="auto"></video>`;
    return ap?`<div class="gcv ap${t.b?' hh':''}">${v}<div class="gtxt">${t.b?`<span class="fit h" data-max="1250">${fx(t.b,true)}</span>`:''}<span class="fit m" data-maxh="${t.b?106:158}"><i>${fx(t.a)}</i></span></div></div>`
      :`<div class="gcv nm">${v}<div class="gtxt"><span class="fit n" data-max="880">${fx(t.a)}</span><span class="fit c" data-maxh="78"><i>${fx(t.b||'',true)}</i></span></div></div>`;}
  return null;
}
const capas={},actual={};
function fin(g){if(g.fin==='mantener'||Estado.get().aire[g.tipo]!==g.id)return;(Estado.quitarAire||Estado.ocultar)(g.tipo);}
const pre={},blobs={},prog={};
function precargar(s){if(CANAL||/mudo/.test(location.search))return;const N=new Set();s.graficas.forEach(g=>{if((g.tipo==='motion'||g.tipo==='carton')&&g.t&&g.t.src)N.add(g.t.src);});const ci=cartonDe({id:'x_ci',t:{}},s);if(ci)N.add(ci);const cc=cartonDe({id:'x_cc',t:{}},s);if(cc)N.add(cc);N.add('gc_nombre.webm');N.add('gc_apoyo.webm');
  N.forEach(n=>{if(!n||/PENDIENTE_/.test(n)||pre[n]||/\.(png|jpe?g|webp|gif|svg)$/i.test(n))return;pre[n]=1;prog[n]=0;
  fetch('media/'+encodeURIComponent(n)).then(r=>{if(!r.ok)throw 0;const L=+r.headers.get('content-length')||0,rd=r.body.getReader(),parts=[];let got=0;
    return (function leer(){return rd.read().then(({done,value})=>{if(done)return new Blob(parts,{type:r.headers.get('content-type')||'video/mp4'});parts.push(value);got+=value.length;prog[n]=L?Math.round(got*100/L):Math.round(got/1e6)+' MB';return leer();});})();})
  .then(b=>{blobs[n]=URL.createObjectURL(b);prog[n]=100;}).catch(()=>{prog[n]='error';});});}
function montar(c,g){const v=c.querySelector('video');if(!v)return;let hecho=false;const fijo=g.tipo==='carton';if(fijo){v.loop=true;v.muted=!Estado.get().cartonSonido;}const f=()=>{if(hecho||fijo)return;hecho=true;fin(g);};
  v.onended=f;v.onerror=()=>{console.warn('Video no reproducible:',g.t.src);f();};
  v.ontimeupdate=()=>{if(v.duration&&v.currentTime>=v.duration-0.08)f();};
  if(/mudo/.test(location.search))v.muted=true;
  v.play().catch(()=>{v.muted=true;v.play().catch(()=>{});});
  if(g.fondo==='verde'){const cv=document.createElement('canvas');cv.width=960;cv.height=540;v.after(cv);v.style.cssText='position:absolute;opacity:0;width:2px;height:2px';
    const x=cv.getContext('2d',{willReadFrequently:true});
    (function f(){if(!v.isConnected)return;if(v.readyState>1){x.drawImage(v,0,0,960,540);const d=x.getImageData(0,0,960,540),a=d.data;
      for(let i=0;i<a.length;i+=4){const r=a[i],gg=a[i+1],b=a[i+2],m=Math.max(r,b);if(gg>80&&gg>m*1.3){const k=Math.min(1,(gg-m)/70);a[i+3]=Math.round(255*(1-k));a[i+1]=m;}}
      x.putImageData(d,0,0);}requestAnimationFrame(f);})();}}
function capa(tipo){return capas[tipo]||(capas[tipo]=document.getElementById('escena').appendChild(Object.assign(document.createElement('div'),{className:'capa capa-'+tipo})));}
const GCV={gc:{freeze:2.2,out:6.1,dur:.55,ti:.75},ap:{loop:[2,4],out:6.4,dur:.4,ti:.7}};
function gcvStart(w){const v=w.querySelector('video');if(!v)return;const c=GCV[w.classList.contains('ap')?'ap':'gc'];w._cfg=c;
  setTimeout(()=>w.classList.add('on'),c.ti*1000);v.play().catch(()=>{});
  (function tick(){if(!w.isConnected||w._out)return;const t=v.currentTime;if(c.loop){if(t>=c.loop[1])v.currentTime=c.loop[0];}else if(t>=c.freeze){v.pause();v.currentTime=c.freeze;return;}requestAnimationFrame(tick);})();}
function ajustar(w){w.querySelectorAll('.fit').forEach(e=>{e.style.fontSize='';let s=parseFloat(getComputedStyle(e).fontSize);const h=+e.dataset.maxh,m=+e.dataset.max;while((h?e.scrollHeight>h:e.scrollWidth>m)&&s>(h?22:26)){s-=2;e.style.fontSize=s+'px';}});}
function salir(el,fn){if(!el)return fn();
  if(el.classList.contains('gcv')){const v=el.querySelector('video'),c=el._cfg||{out:6.1,dur:.55};el._out=1;el.classList.add('out');try{v.currentTime=c.out;}catch(e){}v.play().catch(()=>{});setTimeout(()=>{el.remove();fn();},c.dur*1000+150);return;}el.classList.add('sale');setTimeout(()=>{el.remove();fn();},450);}
function poner(tipo,g){const c=capa(tipo),h=plantilla(g);if(!h)return;c.innerHTML='';c.insertAdjacentHTML('beforeend',h);c.firstElementChild.classList.add('entra');montar(c,g);const w=c.querySelector('.gcv');if(w){gcvStart(w);ajustar(w);if(document.fonts)document.fonts.load('40px A4Speed').then(()=>ajustar(w));setTimeout(()=>ajustar(w),500);}actual[tipo]=g.id+'|'+(Estado.get().tema||'')+JSON.stringify([Estado.get().cartonSrc,Estado.get().cartonCierre,Estado.get().cartonSonido])+JSON.stringify(g.t);}
Estado.sub(s=>{
  precargar(s);
  new Set([...Object.keys(actual),...Object.keys(s.aire)]).forEach(tipo=>{
    const g=s.graficas.find(x=>x.id===s.aire[tipo]),key=g&&g.id+'|'+(s.tema||'')+JSON.stringify([s.cartonSrc,s.cartonCierre,s.cartonSonido])+JSON.stringify(g.t),c=capa(tipo);
    if(actual[tipo]===key)return;
    const viejo=c.firstElementChild;delete actual[tipo];
    if(!g){salir(viejo,()=>{});return;}
    salir(viejo,()=>poner(tipo,g));
  });
});
const demo=location.hash.match(/demo=([\w,]+)/);
if(demo){Estado.limpiar();demo[1].split(',').forEach(i=>Estado.mostrar(i));}
