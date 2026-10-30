/* Salida OBS v1: una capa por tipo; la nueva reemplaza a la anterior. */
const MASCOTA=`<svg viewBox="0 0 200 200" class="mascota"><circle cx="28" cy="108" r="22" fill="#1FA8F0" stroke="#fff" stroke-width="5"/><circle cx="172" cy="108" r="22" fill="#1FA8F0" stroke="#fff" stroke-width="5"/><circle cx="100" cy="98" r="76" fill="#1FA8F0" stroke="#fff" stroke-width="6"/><rect x="40" y="52" width="120" height="92" rx="44" fill="#0b0b12"/><path d="M60 98q14-18 28 0M112 98q14-18 28 0" stroke="#8fe3ff" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M88 122q12 9 24 0" stroke="#8fe3ff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M56 176l88-0-12 20H68z" fill="#1FA8F0" stroke="#fff" stroke-width="4"/></svg>`;
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function plantilla(g){
  const t=g.t||{};
  if(Object.values(t).some(v=>/PENDIENTE_/.test(v)))return null; // nunca a pantalla
  const col=`var(--${g.color||'magenta'})`;
  if(g.tipo==='carton')return `<div class="carton"><div class="rayos"></div><div class="puntos"></div><div class="logo"><b>FRIKITAL</b><b class="f">FEST</b><i>2026</i></div><div class="lema"><span>TU AVENTURA</span><em>GEEK</em><span class="c">COMIENZA AQUÍ</span></div>${MASCOTA}</div>`;
  if(g.tipo==='titulo')return `<div class="titulo" style="--c:${col}"><span>${esc(t.a)}</span></div>`;
  if(g.tipo==='gc')return `<div class="gc" style="--c:${col}"><div class="nom">${esc(t.a)}</div><div class="car">${esc(t.b||'')}</div></div>`;
  return null;
}
const capas={},actual={};
function capa(tipo){return capas[tipo]||(capas[tipo]=document.getElementById('escena').appendChild(Object.assign(document.createElement('div'),{className:'capa capa-'+tipo})));}
function salir(el,fn){if(!el)return fn();el.classList.add('sale');setTimeout(()=>{el.remove();fn();},450);}
function poner(tipo,g){const c=capa(tipo),h=plantilla(g);if(!h)return;c.innerHTML='';c.insertAdjacentHTML('beforeend',h);const n=c.firstElementChild;n.classList.add('entra');actual[tipo]=g.id+'|'+JSON.stringify(g.t);}
Estado.sub(s=>{
  const tipos=new Set([...Object.keys(actual),...Object.keys(s.aire)]);
  tipos.forEach(tipo=>{
    const id=s.aire[tipo],g=s.graficas.find(x=>x.id===id),key=g&&g.id+'|'+JSON.stringify(g.t),c=capa(tipo);
    if(actual[tipo]===key)return;
    const viejo=c.firstElementChild;delete actual[tipo];
    if(!g){salir(viejo,()=>{});return;}
    salir(viejo,()=>poner(tipo,g));
  });
});
const demo=location.hash.match(/demo=([\w,]+)/);
if(demo){Estado.limpiar();demo[1].split(',').forEach(i=>Estado.mostrar(i));}
