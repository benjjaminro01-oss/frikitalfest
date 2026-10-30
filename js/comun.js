/* Frikital CG · núcleo compartido v1 */
const VER='1';
const DEF={graficas:[
{id:'carton_inicio',nombre:'Cartón inicio',tipo:'carton',tecla:'F13',t:{}},
{id:'s1_titulo',nombre:'S1 · Título GC',tipo:'titulo',tecla:'F15',color:'magenta',t:{a:'FRIKITAL FEST 2026 · EN VIVO'}},
{id:'s1_conductor',nombre:'S1 · Conductor/a',tipo:'gc',tecla:'F16',color:'azul',t:{a:'PENDIENTE_NOMBRE_CONDUCTOR',b:'CONDUCTOR/A'}},
{id:'s3_dario',nombre:'S3 · Darío Cuesta',tipo:'gc',tecla:'F16',color:'azul',t:{a:'Darío Cuesta',b:'DIRECTOR NACIONAL · COMUNICACIÓN Y DISEÑO'}}
],aire:{}};
const Estado=(()=>{
  const K='frk_estado_v'+VER,bc=new BroadcastChannel('frk_'+VER),subs=[];
  let s=JSON.parse(localStorage.getItem(K)||'null')||structuredClone(DEF);
  const emit=()=>subs.forEach(f=>f(s));
  const guardar=()=>{localStorage.setItem(K,JSON.stringify(s));bc.postMessage(s);emit();};
  bc.onmessage=e=>{s=e.data;emit();};
  window.addEventListener('storage',e=>{if(e.key===K){s=JSON.parse(e.newValue);emit();}});
  return{get:()=>s,sub:f=>{subs.push(f);f(s);},
    mostrar(id){const g=s.graficas.find(x=>x.id===id);if(g){s.aire[g.tipo]=id;guardar();}},
    ocultar(tipo){delete s.aire[tipo];guardar();},limpiar(){s.aire={};guardar();}};
})();
