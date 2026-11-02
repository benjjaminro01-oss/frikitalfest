/* Sincronización en tiempo real (Firebase Realtime Database). Sin configuración válida, queda en modo local. */
(async()=>{
  const c=window.FIREBASE_CONFIG;if(!c||/PENDIENTE_/.test(c.apiKey)||CANAL){Estado.modo='local';return;}
  const q=new URLSearchParams(location.search).get('sala'),sala=q||localStorage.getItem('frk_sala');
  if(!sala||!/^[A-Za-z0-9_-]{16,40}$/.test(sala)){Estado.modo='local (sin sala)';return;}
  localStorage.setItem('frk_sala',sala);
  const L=u=>new Promise((ok,no)=>{const e=document.createElement('script');e.src=u;e.onload=ok;e.onerror=no;document.head.appendChild(e);});
  try{const B='https://www.gstatic.com/firebasejs/10.12.2/firebase-';
    await L(B+'app-compat.js');await L(B+'auth-compat.js');await L(B+'database-compat.js');
    firebase.initializeApp(c);await firebase.auth().signInAnonymously();
    const ref=firebase.database().ref('salas/'+sala+'/estado'),limpio=s=>JSON.parse(JSON.stringify(s));
    Estado.onGuardar(s=>ref.set(limpio(s)));
    ref.on('value',sn=>{const v=sn.val();if(v)Estado.recibir(v);else ref.set(limpio(Estado.get()));});
    Estado.modo='en línea · sala '+sala.slice(0,4)+'…';
  }catch(e){console.warn('Firebase:',e);Estado.modo='local (error de conexión)';}
  document.dispatchEvent(new Event('frk-modo'));
})();
