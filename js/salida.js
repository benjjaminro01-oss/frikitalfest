/* Salida OBS v2: capas por tipo; la nueva reemplaza a la anterior. */
const RAYO=c=>`<svg viewBox="0 0 60 110" class="rayo"><polygon points="34,0 4,62 26,62 16,110 56,40 34,40 46,0" fill="${c}" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>`;
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const estrellas=n=>Array.from({length:n},(_,i)=>`<b class="st" style="left:${(i*137.5)%100}%;top:${(i*61.8+i*i*3)%100}%;--s:${14+(i*7)%24}px;animation-delay:${(i*.37)%3}s"></b>`).join('');
function plantilla(g){
  const t=g.t||{};
  if(Object.values(t).some(v=>/PENDIENTE_/.test(v)))return null; // nunca a pantalla
  const col=`var(--${g.color||'magenta'})`;
  if(g.tipo==='carton')return `<div class="carton t-${Estado.get().tema||'turquesa'}"><div class="rayos"></div><div class="rayos r2"></div><div class="puntos"></div><div class="destello"></div>${estrellas(26)}<div class="luna"></div><div class="rb r1">${RAYO('#E6177F')}</div><div class="rb r2">${RAYO('#1FA8F0')}</div><div class="rb r3">${RAYO('#E6177F')}</div><div class="rb r4">${RAYO('#1FA8F0')}</div><div class="logo"><svg viewBox="0 0 ${LOGO.w} ${LOGO.h}"><path class="la" fill-rule="evenodd" d="${LOGO.A}"/><path class="lf" fill-rule="evenodd" d="${LOGO.F}"/></svg><i>2026</i></div><div class="lema"><span class="l1">TU AVENTURA</span><em>GEEK</em><span class="l2">COMIENZA AQUÍ</span></div>${mascota(g)}<div class="pie">SÁBADO 7 DE NOVIEMBRE · SANTO TOMÁS TALCA</div></div>`;
  if(g.tipo==='titulo')return `<div class="titulo" style="--c:${col}"><div class="ic">${RAYO('#fff')}</div><div class="placa"><span>${esc(t.a)}</span></div><div class="subraya"></div><b class="st" style="right:-30px;top:-26px;--s:34px"></b><b class="st" style="right:40px;top:-40px;--s:20px;animation-delay:.6s"></b></div>`;
  if(g.tipo==='rotulo'&&g.var==='apoyo')return `<div class="apoyo" style="--c:${col}">${t.b?`<div class="ah"><span>${esc(t.b)}</span></div>`:''}<div class="at"><span>${esc(t.a)}</span></div></div>`;
  if(g.tipo==='rotulo')return `<div class="gc" style="--c:${col}"><div class="av">${CARA}</div><div class="cuerpo"><div class="nom"><span>${esc(t.a)}</span></div><div class="car"><span>${esc(t.b||'')}</span><div class="rayo2">${RAYO('#fff')}</div></div></div></div>`;
  return null;
}
const capas={},actual={};
function capa(tipo){return capas[tipo]||(capas[tipo]=document.getElementById('escena').appendChild(Object.assign(document.createElement('div'),{className:'capa capa-'+tipo})));}
function salir(el,fn){if(!el)return fn();el.classList.add('sale');setTimeout(()=>{el.remove();fn();},450);}
function poner(tipo,g){const c=capa(tipo),h=plantilla(g);if(!h)return;c.innerHTML='';c.insertAdjacentHTML('beforeend',h);c.firstElementChild.classList.add('entra');actual[tipo]=g.id+'|'+(Estado.get().tema||'')+JSON.stringify(g.t);}
Estado.sub(s=>{
  new Set([...Object.keys(actual),...Object.keys(s.aire)]).forEach(tipo=>{
    const g=s.graficas.find(x=>x.id===s.aire[tipo]),key=g&&g.id+'|'+(s.tema||'')+JSON.stringify(g.t),c=capa(tipo);
    if(actual[tipo]===key)return;
    const viejo=c.firstElementChild;delete actual[tipo];
    if(!g){salir(viejo,()=>{});return;}
    salir(viejo,()=>poner(tipo,g));
  });
});
const demo=location.hash.match(/demo=([\w,]+)/);
if(demo){Estado.limpiar();demo[1].split(',').forEach(i=>Estado.mostrar(i));}
