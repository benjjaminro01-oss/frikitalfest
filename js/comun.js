/* Frikital CG · núcleo compartido v4 */
const VER='6',CANAL=new URLSearchParams(location.search).get('canal')||'';
const CARTON_DEF='carton_inicio_web.mp4';
function cartonDe(g,s){const t=g.t||{};if(t.src&&!/PENDIENTE_/.test(t.src))return t.src;if(/_cc$/.test(g.id))return s.cartonCierre===undefined?CARTON_DEF:s.cartonCierre;return s.cartonSrc===undefined?CARTON_DEF:s.cartonSrc;}
const NOM={1:'Apertura',2:'Jedi + Ludopalooza',3:'Darío Cuesta',4:'Luis Galáz',5:'Jackfredo',6:'Marcas',7:'Premiación'};
const S=[
{n:1,tit:'FRIKITAL FEST 2026 · EN VIVO',gc:[['PENDIENTE_NOMBRE_CONDUCTOR','CONDUCTOR/A','Conductor/a'],['PENDIENTE_JACKFREDO_CONFIRMAR_EN_RECINTO','ILUSTRADOR','Jackfredo (opcional)','Solo si está confirmado en el recinto']],pl:[['2.ª edición · Desde las 10:00 · Santo Tomás Talca','Datos del festival'],['Área de Comunicación y Diseño + Área de Informática','Organizadores','ORGANIZAN'],['Aprendizaje práctico · Trabajo colaborativo · Comunidad','Aprendizaje']]},
{n:2,tit:'COMUNIDADES GEEK',gc:[['PENDIENTE_NOMBRE_JEDI','COMUNIDAD JEDI','Comunidad Jedi','Solo tras confirmación'],['PENDIENTE_NOMBRE_LUDOPALOOZA','LUDOPALOOZA','Ludopalooza','Solo tras confirmación']],pl:[['PENDIENTE_REDES','Redes (opcional)']]},
{n:3,tit:'FRIKITAL FEST 2026',gc:[['Darío Cuesta','DIRECTOR NACIONAL · COMUNICACIÓN Y DISEÑO','Darío Cuesta','Confirmar cargo vigente. Solo en la presentación inicial.']],pl:[]},
{n:4,tit:'TECNOLOGÍA E INNOVACIÓN',gc:[['Luis Galáz','DIRECTOR DE CARRERA · INFORMÁTICA','Luis Galáz','Confirmar cargo vigente y pronunciación']],pl:[['Tecnología · Creatividad · Innovación','Placa (opcional)']]},
{n:5,tit:'ILUSTRACIÓN Y CULTURA VISUAL',gc:[['Jackfredo','ILUSTRADOR','Jackfredo','Confirmar grafía y denominación']],pl:[['PENDIENTE_REDES_JACKFREDO','Redes (opcional)']]},
{n:6,tit:'COLABORADORES FRIKITAL FEST 2026',gc:[['PENDIENTE_NOMBRE_RED_BULL','RED BULL','Red Bull','Con logo según manual de marca'],['PENDIENTE_NOMBRE_MUVIX','MUVIX','Muvix','Con logo según manual de marca'],['PENDIENTE_NOMBRE_BIMEDIA','BIMEDIA','BiMedia','Con logo según manual de marca']],pl:[]},
{n:7,tit:'CEREMONIA DE PREMIACIÓN',gc:[['Jorge Córdova Pacheco','DIRECTOR DE CARRERA · DISEÑO GRÁFICO','Jorge Córdova Pacheco','Confirmar cargo']],pl:[['PENDIENTE_CATEGORIA','Categoría'],['PENDIENTE_GANADOR','Ganador/a (según acta oficial)'],['PENDIENTE_FOTO_GRUPAL','Foto grupal']]}];
function armar(){const g=[];S.forEach(s=>{const p='s'+s.n+'_',ad=(id,nombre,tipo,tecla,t,x)=>g.push({id:p+id,nombre,tipo,tecla,sn:s.n,t,...x}),f=s.n===7;
 ad('ci','Cartón inicio','carton','F13',{});
 ad('ma','Motion apertura','motion','F14',{src:'motion_apertura.mp4'},{fondo:'alfa',fin:'ocultar'});
 ad('tit','Título GC','titulo','F15',{a:s.tit},{color:'magenta'});
 s.gc.forEach((x,i)=>ad('gc'+(i+1),x[2],'rotulo',['F16','F17','F18'][i],{a:x[0],b:x[1]},{var:'gc',color:'azul',nota:x[3]}));
 s.pl.forEach((x,i)=>ad('pl'+(i+1),x[1],'rotulo',['F19','F22','F23'][i],{a:x[0],b:x[2]||''},{var:'apoyo',color:'azul'}));
 ad('mc',f?'Motion final':'Motion cierre','motion','F20',{src:'PENDIENTE_ARCHIVO_'+(f?'MOTION_FINAL':'MOTION_CIERRE')},{fondo:'alfa',fin:'ocultar',nota:'Archivo pendiente: súbelo a la carpeta media de GitHub y elígelo aquí'});
 ad('cc',f?'Cartón final':'Cartón cierre','carton','F21',{},f?{nota:'Usa el mismo cartón que el inicio. Cartón final con logos de auspiciadores: pendiente de definir'}:{});});return g;}
const DEF={graficas:armar(),aire:{},tema:'turquesa',paso:{n:1,i:0},ver:VER};
const Estado=(()=>{
  const K='frk_estado_v'+VER,bc=new BroadcastChannel('frk_'+VER+CANAL),subs=[],gu=[];
  let s=(!CANAL&&JSON.parse(localStorage.getItem(K)||'null'))||JSON.parse(JSON.stringify(DEF));
  const emit=()=>subs.forEach(f=>f(s));
  const guardar=()=>{if(!CANAL)localStorage.setItem(K,JSON.stringify(s));bc.postMessage(s);gu.forEach(f=>f(s));emit();};
  bc.onmessage=e=>{s=e.data;emit();};
  if(!CANAL)window.addEventListener('storage',e=>{if(e.key===K&&e.newValue){s=JSON.parse(e.newValue);emit();}});
  return{modo:'local',get:()=>s,sub:f=>{subs.push(f);f(s);},onGuardar:f=>gu.push(f),
    recibir(o){o.aire=o.aire||{};o.paso=o.paso||{n:1,i:0};o.graficas=(Array.isArray(o.graficas)?o.graficas:Object.values(o.graficas)).map(g=>({...g,t:g.t||{}}));s=o;if(!CANAL)localStorage.setItem(K,JSON.stringify(s));bc.postMessage(s);emit();},
    mut(fn){fn(s);guardar();},
    mostrar(id){const g=s.graficas.find(x=>x.id===id);if(g){s.aire[g.tipo]=id;guardar();}},
    ocultar(tipo){delete s.aire[tipo];guardar();},limpiar(){s.aire={};guardar();},quitarLocal(tipo){delete s.aire[tipo];emit();}};
})();
