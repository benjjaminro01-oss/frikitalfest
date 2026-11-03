/* Panel de control v4 */
const $=s=>document.querySelector(s);
let vista=localStorage.getItem('frk_vista')||'control',stm=Estado.get().paso.n||1,edit=false,tab='disp';
const disp=()=>{const d=localStorage.getItem('frk_disp')||'auto';return d==='botonera'||(d==='auto'&&matchMedia('(pointer:coarse)').matches&&innerWidth<1100)?'botonera':'completo';};
const pend=g=>Object.values(g.t||{}).some(v=>/PENDIENTE_/.test(v))||(g.tipo==='motion'&&!g.t.src);
const gs=()=>Estado.get().graficas.filter(g=>g.sn===stm);
const G=id=>Estado.get().graficas.find(g=>g.id===id);
const aire=g=>Estado.get().aire[g.tipo]===g.id;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TIPO={carton:'CARTÓN',motion:'MOTION',titulo:'TÍTULO',rotulo:'RÓTULO'};
const LAB=(v,f)=>f==='a'?(v==='apoyo'?'Texto de apoyo':'Nombre'):(v==='apoyo'?'Encabezado (opcional)':'Cargo');
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display='none',2600);}
const bcPrev=new BroadcastChannel('frk_'+VER+'prev');let pv=null;
function aplicar(id){const card=document.querySelector(`.gr[data-gid="${id}"]`);if(!card)return;Estado.mut(s=>{const g=s.graficas.find(x=>x.id===id);card.querySelectorAll('[data-f]').forEach(i=>{if(['color','var','fondo','fin'].includes(i.dataset.f))g[i.dataset.f]=i.value;else g.t[i.dataset.f]=i.value;});});}
function mostrar(id,conEdicion){const g=G(id);if(conEdicion)aplicar(id);const x=G(id);if(pend(x)){toast('Tiene marcador PENDIENTE_: no se muestra en pantalla. Complétalo antes.');return;}Estado.mostrar(id);}
const toggle=id=>{const g=G(id);aire(g)?Estado.ocultar(g.tipo):mostrar(id,false);};
function prev(id){aplicar(id);const s=Estado.get(),g=G(id);pv={...Estado.get(),aire:{[g.tipo]:g.id}};bcPrev.postMessage(pv);toast('Vista previa: '+g.nombre);}
function paso(d){const p=ESC.find(e=>e.n===stm).p;Estado.mut(s=>{const i=(s.paso.n===stm?s.paso.i:0)+d;s.paso={n:stm,i:Math.max(0,Math.min(p.length-1,i))};});}
function monitores(){return `<div class="mons"><div class="mon"><h4>VISTA PREVIA · solo operador</h4><div class="v"><iframe data-sc src="salida.html?canal=prev&cuadros&mudo"></iframe></div></div><div class="mon al"><h4>● AL AIRE</h4><div class="v"><iframe data-sc src="salida.html?cuadros&mudo${(location.search.match(/sala=[\w-]+/)||[''])[0]?'&'+location.search.match(/sala=[\w-]+/)[0]:''}"></iframe></div></div></div>`;}
function escaleta(){const p=ESC.find(e=>e.n===stm).p,ps=Estado.get().paso,cur=ps.n===stm?ps.i:-1;return `<div class="col"><h3>Escaleta · Streaming ${stm}<button data-act="ant">◀ Re Pág</button><button data-act="sig">Av Pág ▶</button></h3><div class="esc">${p.map((x,i)=>`<div class="st ${i===cur?'on':''}" data-paso="${i}"><span class="tc">${esc(x.tc)} · ${esc(x.d)}</span><b>${esc(x.b)}</b> <span class="n">${esc(x.cam)}</span><p class="g">${esc(x.gr)}</p><p class="tx">${esc(x.tx)}</p><p class="n">${esc(x.nt)}</p></div>`).join('')}</div></div>`;}
function tarjeta(g){const t=g.t||{},ed=g.tipo==='rotulo'||g.tipo==='titulo',ro=g.tipo==='rotulo';
 return `<div class="gr ${aire(g)?'air':''}" data-gid="${g.id}"><div class="gh"><i class="dot"></i><b>${esc(g.nombre)}</b><span class="tag">${TIPO[g.tipo]}</span><span class="tag">${esc(g.tecla)}</span>${pend(g)?'<span class="tag pend">PENDIENTE</span>':''}</div>
 ${ro?`<div class="gt"><label class="lb"><span data-l="a">${LAB(g.var,'a')}</span><input data-f="a" value="${esc(t.a)}"></label><label class="lb"><span data-l="b">${LAB(g.var,'b')}</span><input data-f="b" value="${esc(t.b)}"></label></div>`:ed?`<div class="gt"><input data-f="a" value="${esc(t.a)}" aria-label="Texto"></div>`:''}
 ${g.nota?`<p class="nota">⚠ ${esc(g.nota)}</p>`:''}
 ${g.tipo==='motion'?`<div class="gt"><label class="lb"><span>Archivo (biblioteca)</span><select data-f="src" data-v="${esc(g.t.src||'')}"><option value="${esc(g.t.src||'')}">${esc(g.t.src||'— elegir —')}</option></select></label><div class="gb"><label class="lb"><span>Fondo</span><select data-f="fondo"><option value="alfa" ${g.fondo!=='verde'?'selected':''}>Transparente / imagen</option><option value="verde" ${g.fondo==='verde'?'selected':''}>Fondo verde (chroma)</option></select></label><label class="lb"><span>Al terminar</span><select data-f="fin"><option value="ocultar" ${g.fin!=='mantener'?'selected':''}>Ocultar solo</option><option value="mantener" ${g.fin==='mantener'?'selected':''}>Mantener último cuadro</option></select></label></div></div>`:''}<div class="gb"><button class="ok" data-act="show">MOSTRAR</button><button class="no" data-act="hide">OCULTAR</button><button data-act="upd">ACTUALIZAR</button><button data-act="prev">PREV</button>${g.custom?'<button data-act="del">ELIMINAR</button>':''}${ro?`<select data-f="var" aria-label="Tipo de rótulo"><option value="gc" ${g.var!=='apoyo'?'selected':''}>Nombre GC</option><option value="apoyo" ${g.var==='apoyo'?'selected':''}>Apoyo de texto</option></select>`:''}${ed?`<select data-f="color"><option value="azul" ${g.color==='azul'?'selected':''}>Azul</option><option value="magenta" ${g.color==='magenta'?'selected':''}>Magenta</option></select>`:''}</div></div>`;}
function botonera(){return `<div class="bar"><button data-act="edit" class="${edit?'on':''}">${edit?'Terminar edición':'Editar botonera'}</button><span class="n">${edit?'Toca el recuadro de tecla y pulsa la tecla deseada (F13–F24 o cualquiera).':'Toca para mostrar; vuelve a tocar para ocultar. Rojo = al aire.'}</span></div><div class="bots">${gs().map(g=>`<div><button class="bt ${aire(g)?'air':''} ${pend(g)?'pd':''}" data-gid="${g.id}" data-act="tog"><span class="k">${esc(g.tecla)}</span><b>${esc(g.nombre)}</b><small>${esc(g.t.a||'')}</small></button>${edit?`<input class="kin" data-kin="${g.id}" readonly value="${esc(g.tecla)}">`:''}</div>`).join('')}</div>`;}
function render(){const v=disp()==='botonera'?'botonera':vista,s=Estado.get();
 document.body.dataset.solo=disp()==='botonera'?'1':'0';
 $('#vistas').innerHTML=[['control','Control'],['visual','Control + Visual'],['botonera','Botonera']].map(([k,n])=>`<button data-v="${k}" class="${k===v?'on':''}">${n}</button>`).join('');
 $('#stm').innerHTML=ESC.map(e=>`<button data-stm="${e.n}" class="${e.n===stm?'on':''}">${e.n}<small>${NOM[e.n]}</small></button>`).join('');
 $('#modo').textContent=Estado.modo;
 if(v==='visual'){if(!$('#mons').firstChild){$('#mons').innerHTML=monitores();const f=$('#mons iframe');f.onload=()=>pv&&bcPrev.postMessage(pv);}}else $('#mons').innerHTML='';
 $('#main').innerHTML=v==='botonera'?botonera():`<div class="cols">${escaleta()}<div class="col"><h3>Gráficas · ${NOM[stm]}</h3>${gs().map(tarjeta).join('')}</div></div>`;
 escalar();poblar();const on=document.querySelector('.st.on');if(on&&!render.q){on.scrollIntoView({block:'nearest'});}}
function escalar(){document.querySelectorAll('iframe[data-sc]').forEach(f=>{f.style.transform=`scale(${f.parentElement.clientWidth/1920})`;});}
function pintar(){const s=Estado.get();document.querySelectorAll('[data-gid]').forEach(e=>{const g=G(e.dataset.gid);if(g)e.classList.toggle('air',aire(g));});}
Estado.sub(()=>{const a=document.activeElement;if(a&&a.matches('input,select')&&!a.classList.contains('kin'))pintar();else render();});
document.addEventListener('frk-modo',()=>$('#modo').textContent=Estado.modo);
addEventListener('resize',()=>{escalar();if(disp()==='botonera'||document.body.dataset.v!==vista)render();});
document.addEventListener('click',e=>{const b=e.target.closest('[data-act],[data-v],[data-stm],[data-paso]');if(!b)return;const card=b.closest('[data-gid]'),id=card&&card.dataset.gid,a=b.dataset.act;
 if(b.dataset.v){vista=b.dataset.v;localStorage.setItem('frk_vista',vista);render();}
 else if(b.dataset.stm){stm=+b.dataset.stm;render();}
 else if(b.dataset.paso!==undefined){Estado.mut(s=>{s.paso={n:stm,i:+b.dataset.paso};});}
 else if(a==='show')mostrar(id,true);else if(a==='hide'){Estado.ocultar(G(id).tipo);}else if(a==='upd'){aplicar(id);toast('Actualizado');}
 else if(a==='prev')prev(id);else if(a==='tog')toggle(id);else if(a==='edit'){edit=!edit;render();}
 else if(a==='del'){const g=G(id);if(confirm('¿Eliminar "'+g.nombre+'"?'))Estado.mut(s=>{if(s.aire[g.tipo]===id)delete s.aire[g.tipo];s.graficas=s.graficas.filter(x=>x.id!==id);});}
 else if(a==='ant')paso(-1);else if(a==='sig')paso(1);});
$('#limpiar').onclick=()=>{Estado.limpiar();toast('Salida limpia');};
document.addEventListener('keydown',e=>{const a=document.activeElement;
 if(a&&a.classList.contains('kin')){e.preventDefault();const k=e.key==='Escape'?'':(e.key.length===1?e.key.toUpperCase():e.key);Estado.mut(s=>{s.graficas.find(g=>g.id===a.dataset.kin).tecla=k;});return;}
 if(a&&a.matches('input,select,textarea')||$('#dlg').open)return;
 if(e.key==='PageDown'){e.preventDefault();paso(1);return;}if(e.key==='PageUp'){e.preventDefault();paso(-1);return;}
 const g=gs().find(x=>x.tecla&&x.tecla.toLowerCase()===e.key.toLowerCase());if(g){e.preventDefault();toggle(g.id);}});
/* Configuración */
function cfg(){const s=Estado.get(),sala=localStorage.getItem('frk_sala')||'',d=localStorage.getItem('frk_disp')||'auto',base=location.href.replace(/panel\.html.*/,'');
 const T=[['disp','Dispositivo'],['gen','General'],['bib','Biblioteca'],['bot','Botonera'],['gra','Gráficas'],['tra','Transiciones']];
 let h=`<div class="tabs">${T.map(([k,n])=>`<button data-tab="${k}" class="${tab===k?'on':''}" ${['bot','gra','tra'].includes(k)?'disabled title="Próximamente"':''}>${n}${['bot','gra','tra'].includes(k)?' (pronto)':''}</button>`).join('')}</div>`;
 if(tab==='disp')h+=`<p>Cómo se muestra el panel en este equipo.</p>${[['auto','Automático (celular y tablet = botonera, computador = panel completo)'],['botonera','Solo botonera'],['completo','Panel completo']].map(([k,n])=>`<label class="fila"><input type="radio" name="d" value="${k}" ${d===k?'checked':''}> ${n}</label>`).join('')}`;
 if(tab==='gen')h+=`<div class="fila"><label>Tema de los cartones</label><select id="tema"><option value="turquesa" ${s.tema==='turquesa'?'selected':''}>Turquesa (promo)</option><option value="violeta" ${s.tema==='violeta'?'selected':''}>Violeta (flyers)</option></select></div>
 <p><b>Sala</b> (código que une los equipos). Estado: ${esc(Estado.modo)}</p><span class="mono">${esc(sala)||'(sin sala)'}</span><div class="fila"><button id="nueva">Generar sala nueva</button></div>
 ${sala?`<p>Enlace de la salida para OBS:</p><span class="mono">${esc(base)}salida.html?sala=${esc(sala)}</span><p>Enlace del panel para otros equipos:</p><span class="mono">${esc(base)}panel.html?sala=${esc(sala)}</span>`:''}
 ${/PENDIENTE_/.test(FIREBASE_CONFIG.apiKey)?'<p class="nota">⚠ Falta completar js/config.js con la configuración de Firebase para sincronizar entre equipos.</p>':''}
 <p><b>Copia de seguridad</b></p><div class="fila"><button id="exp">Descargar copia</button><button id="imp">Restaurar copia</button><input type="file" id="arch" accept=".json" hidden></div>`;
 if(tab==='bib')h+=`<p>Archivos de la carpeta <b>media</b> de tu GitHub: videos MP4/WebM e imágenes PNG/JPG/SVG/WebP/GIF.</p><div class="fila"><button id="bref">Actualizar lista</button></div><div id="blist">Cargando…</div><p class="nota">Para agregar: en GitHub abre la carpeta <b>media</b> → Add file → Upload files → Commit. Puede tardar 1–2 minutos en aparecer. Elige archivos de hasta 25 MB.</p>`;
 $('#dlgc').innerHTML=h;if(tab==='bib')bib(false);}
$('#cfg').onclick=()=>{cfg();$('#dlg').showModal();};$('#cerrar').onclick=()=>$('#dlg').close();
$('#dlg').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b&&!b.disabled){tab=b.dataset.tab;cfg();}
 if(e.target.name==='d'){localStorage.setItem('frk_disp',e.target.value);render();}
 if(e.target.id==='nueva'){const a=crypto.getRandomValues(new Uint8Array(18)),c=btoa(String.fromCharCode(...a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'').slice(0,24);localStorage.setItem('frk_sala',c);cfg();toast('Sala creada. Recarga con el enlace de abajo para conectar.');}
 if(e.target.id==='bref')bib(true);if(e.target.dataset.crear)crear(e.target.dataset.crear);
 if(e.target.id==='exp'){const u=URL.createObjectURL(new Blob([JSON.stringify(Estado.get(),null,1)],{type:'application/json'}));Object.assign(document.createElement('a'),{href:u,download:'frikital-cg-copia.json'}).click();}
 if(e.target.id==='imp')$('#arch').click();});
$('#dlg').addEventListener('change',e=>{if(e.target.id==='tema')Estado.mut(s=>{s.tema=e.target.value;});if(e.target.id==='arch'){const f=e.target.files[0];if(f)f.text().then(t=>{try{Estado.recibir(JSON.parse(t));toast('Copia restaurada');}catch(x){toast('Archivo no válido');}});}});

document.addEventListener('change',e=>{if(e.target.dataset&&e.target.dataset.f==='var'){const c=e.target.closest('.gr');c.querySelectorAll('[data-l]').forEach(s=>s.textContent=LAB(e.target.value,s.dataset.l));}});

function poblar(){Media.lista().then(l=>document.querySelectorAll('select[data-f=src]').forEach(s=>{const cur=s.dataset.v,ok=cur&&!/PENDIENTE_/.test(cur);s.innerHTML='<option value="">— elegir —</option>'+[...new Set([...l,...(ok?[cur]:[])])].map(n=>`<option ${n===cur?'selected':''}>${esc(n)}</option>`).join('');}));}
function bib(f){Media.lista(f).then(l=>{const b=$('#blist');if(b)b.innerHTML=l.length?l.map(n=>`<div class="fila"><span>${Media.tipo(n)==='video'?'🎞':'🖼'} ${esc(n)}</span><button data-crear="${esc(n)}">Crear gráfica en streaming ${stm}</button></div>`).join(''):'<p class="nota">Aún no hay archivos en la carpeta media.</p>';if(f)poblar();});}
function crear(n){const id='c'+Date.now().toString(36);Estado.mut(s=>{s.graficas.push({id,nombre:n.replace(/\.[^.]+$/,''),tipo:'motion',tecla:'',sn:stm,t:{src:n},custom:true,fondo:'alfa',fin:Media.tipo(n)==='video'?'ocultar':'mantener'});});toast('Gráfica creada en streaming '+stm+' (al final de la lista)');}
