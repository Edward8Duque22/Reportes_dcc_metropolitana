/* ===== Estado ===== */
const TEXT_IDS = ["ciudad","fecha","dirigido","dirNombre","dirOrg","seccional","org","inf","infcargo","infcc","vol","volcc","volnivel","volorg","volcal","volant","h_tiempo","h_lugar","h_ctx","h_cond","h_test","h_cons","normasRel","pruebasSol","aaObs","peticion","notif","anexos"];
let S = { cargos:[{clase:"",num:"",par:"",porque:""}], pruebas:[{tipo:"Documental",desc:"",folios:""}], deb:[], pro:[], pri:[], aten:[], agr:[] };
const KEY = "informe_disciplinario_dc_v1";
function save(){ try{ const o={S,f:{}}; TEXT_IDS.forEach(i=>o.f[i]=document.getElementById(i).value); localStorage.setItem(KEY,JSON.stringify(o)); }catch(e){} }
function load(){ try{ const o=JSON.parse(localStorage.getItem(KEY)||"null"); if(o){ S=Object.assign(S,o.S); TEXT_IDS.forEach(i=>{ if(o.f&&o.f[i]!=null) document.getElementById(i).value=o.f[i]; }); } }catch(e){} }
const esc = s => String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const val = id => document.getElementById(id).value.trim();
const ph = (v,label) => v ? esc(v) : `<span class="ph">[${esc(label)}]</span>`;
const MESES=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
function fechaLarga(v){ if(!v) return ""; const [y,m,d]=v.split("-").map(Number); return `${d} de ${MESES[m-1]} de ${y}`; }

/* ===== Formulario dinámico ===== */
function renderCargos(){
  const box=document.getElementById("cargos"); box.innerHTML="";
  S.cargos.forEach((c,i)=>{
    const d=document.createElement("div"); d.className="cargo";
    const F=FALTAS[c.clase];
    let opts=`<option value="">Seleccione clase</option>`+Object.keys(FALTAS).map(k=>`<option value="${k}" ${c.clase===k?"selected":""}>Falta ${FALTAS[k].nombre.toLowerCase()} (Art. ${FALTAS[k].art})</option>`).join("");
    let nums="";
    if(F){ nums=`<option value="">Seleccione numeral</option>`+F.items.map((t,j)=>`<option value="${j+1}" ${String(c.num)===String(j+1)?"selected":""}>Num. ${j+1}: ${esc(RES.faltas[c.clase][j])}</option>`).join(""); }
    d.innerHTML=`<label style="margin-top:0">Clase de falta</label><select data-k="clase">${opts}</select>
      ${F?`<details class="guia"><summary>Guía rápida: numerales del Art. ${F.art}</summary><ol>${RES.faltas[c.clase].map((r,j)=>`<li value="${j+1}">${esc(r)}</li>`).join("")}</ol></details>`:""}
      <label>Numeral</label><select data-k="num" ${F?"":"disabled"}>${nums||"<option>Primero elija la clase</option>"}</select>
      ${F&&c.num?`<div class="resumen"><b>Art. ${F.art}, num. ${c.num} en resumen:</b> ${esc(RES.faltas[c.clase][c.num-1])}</div>
      <details><summary>Ver texto literal</summary><div class="lit">${esc(F.items[c.num-1])}</div></details>
      <div class="note">Sanción: ${esc(F.sancion)} (${F.ref}).</div>`:""}
      <label>Parágrafo (si aplica)</label><input type="text" data-k="par" value="${esc(c.par)}" placeholder="Ej.: Parágrafo único">
      <label>Por qué los hechos encajan en este numeral</label><textarea data-k="porque">${esc(c.porque)}</textarea>
      ${S.cargos.length>1?`<button class="btn del sm" data-del="${i}" style="margin-top:8px">Quitar esta falta</button>`:""}`;
    d.querySelectorAll("[data-k]").forEach(el=>{
      const ev = el.tagName==="SELECT"?"change":"input";
      el.addEventListener(ev,()=>{ c[el.dataset.k]=el.value; if(el.dataset.k==="clase") c.num=""; if(el.tagName==="SELECT") renderCargos(); update(); });
    });
    const bd=d.querySelector("[data-del]"); if(bd) bd.onclick=()=>{S.cargos.splice(i,1); renderCargos(); update();};
    box.appendChild(d);
  });
}
function renderPruebas(){
  const box=document.getElementById("pruebas"); box.innerHTML="";
  S.pruebas.forEach((p,i)=>{
    const d=document.createElement("div"); d.className="cargo";
    const tipos=["Documental","Testimonial","Fotografías, videos o audios","Capturas de pantalla","Otra"];
    d.innerHTML=`<div class="row2"><div><label style="margin-top:0">Tipo</label><select data-k="tipo">${tipos.map(t=>`<option ${p.tipo===t?"selected":""}>${t}</option>`).join("")}</select></div>
      <div><label style="margin-top:0">Folios</label><input type="text" data-k="folios" value="${esc(p.folios)}"></div></div>
      <label>Descripción</label><input type="text" data-k="desc" value="${esc(p.desc)}">
      <button class="btn del sm" data-del style="margin-top:8px">Quitar</button>`;
    d.querySelectorAll("[data-k]").forEach(el=>el.addEventListener(el.tagName==="SELECT"?"change":"input",()=>{p[el.dataset.k]=el.value; update();}));
    d.querySelector("[data-del]").onclick=()=>{S.pruebas.splice(i,1); renderPruebas(); update();};
    box.appendChild(d);
  });
}
function checks(id,list,key,labelFn,off){ off=off||0;
  const box=document.getElementById(id); box.innerHTML="";
  list.forEach((t,i)=>{
    const l=document.createElement("label"); l.className="chk"; l.style.margin="5px 0"; l.style.color="inherit";
    l.innerHTML=`<input type="checkbox" ${S[key].includes(i+off)?"checked":""}><span>${esc(labelFn(t,i))}</span>`;
    l.querySelector("input").onchange=e=>{ const a=S[key]; const n=i+off; const ix=a.indexOf(n); if(e.target.checked){ if(ix<0)a.push(n);} else if(ix>=0)a.splice(ix,1); update(); };
    box.appendChild(l);
  });
}

/* ===== Destinatario y logo ===== */
const DEST_NOTE={
 seccional:"El Director Seccional es la autoridad que investiga y falla en primera instancia (Art. 41).",
 junta_dir:"La Junta Directiva (Art. 116) es el órgano de administración de la junta y recibe el informe, pero solo el Director Seccional investiga y falla (Art. 41). El informe incluye el traslado a la Seccional.",
 junta:"El presidente recibe el informe por el conducto regular (Art. 18, num. 11), pero solo el Director Seccional investiga y falla (Art. 41). El informe incluye el traslado a la Seccional.",
 comite:"El comité no investiga ni sanciona: solo el Director Seccional puede hacerlo (Art. 41). El informe incluye el traslado a la Seccional."
};
function syncDest(){
  const t=val("dirigido")||"seccional";
  document.getElementById("dirNote").textContent=DEST_NOTE[t];
  document.getElementById("dirOrgBox").style.visibility=t==="seccional"?"hidden":"visible";
}
function destHTML(){
  const t=val("dirigido")||"seccional";
  const nom=val("dirNombre")?`${esc(val("dirNombre"))}, `:"";
  if(t==="junta_dir") return `Junta Directiva de la Junta de Defensa Civil ${ph(val("dirOrg"),"nombre de la junta y municipio")}${val("dirNombre")?`, a la atención de ${esc(val("dirNombre"))}`:""}`;
  if(t==="junta") return `${nom}Presidente(a) de la Junta de Defensa Civil ${ph(val("dirOrg"),"nombre de la junta y municipio")}`;
  if(t==="comite") return `${nom}Voluntario(a) coordinador(a) del Comité ${ph(val("dirOrg"),"nombre del comité y municipio")}`;
  return `${nom}Director(a) Seccional de ${ph(val("seccional"),"Departamento")}`;
}
const LOGO={src:"",ok:false};
function initLogo(){
  const img=document.getElementById("logoImg");
  const src=(typeof LOGO_DATA!=="undefined")?LOGO_DATA:"logo.png";
  img.onload=()=>{LOGO.ok=true;LOGO.src=img.currentSrc||img.src;update();};
  img.onerror=()=>{LOGO.ok=false;LOGO.src="";img.style.display="none";update();};
  img.src=src;
}

/* ===== Firma ===== */
const SIG={strokes:[],data:""};
function initSig(){
  const cv=document.getElementById("sigPad"), wrap=document.getElementById("sigWrap"), ctx=cv.getContext("2d");
  let drawing=false, cur=null;
  const pos=e=>{const r=cv.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
  const ink=()=>{ctx.lineWidth=2.6;ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle="#0b1f3a";};
  function stroke(s){
    if(!s.length) return; ctx.beginPath(); ctx.moveTo(s[0].x,s[0].y);
    if(s.length===1) ctx.lineTo(s[0].x+0.01,s[0].y);
    for(let i=1;i<s.length-1;i++){ctx.quadraticCurveTo(s[i].x,s[i].y,(s[i].x+s[i+1].x)/2,(s[i].y+s[i+1].y)/2);}
    if(s.length>1){const l=s[s.length-1];ctx.lineTo(l.x,l.y);}
    ctx.stroke();
  }
  function redraw(){ctx.clearRect(0,0,cv.width,cv.height);ink();SIG.strokes.forEach(stroke);wrap.classList.toggle("firmado",SIG.strokes.length>0);}
  function fit(){const r=cv.getBoundingClientRect(),d=window.devicePixelRatio||1;if(!r.width)return;cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);ctx.setTransform(d,0,0,d,0,0);redraw();}
  function exportSig(){
    if(!SIG.strokes.length){SIG.data="";return;}
    const w=cv.width,h=cv.height,px=ctx.getImageData(0,0,w,h).data; let x0=w,y0=h,x1=-1,y1=-1;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(px[(y*w+x)*4+3]>10){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}
    if(x1<0){SIG.data="";return;}
    const p=8; x0=Math.max(0,x0-p);y0=Math.max(0,y0-p);x1=Math.min(w-1,x1+p);y1=Math.min(h-1,y1+p);
    const cw=x1-x0+1,ch=y1-y0+1,sc=Math.min(1,600/cw),o=document.createElement("canvas");
    o.width=Math.max(1,Math.round(cw*sc));o.height=Math.max(1,Math.round(ch*sc));
    o.getContext("2d").drawImage(cv,x0,y0,cw,ch,0,0,o.width,o.height);
    SIG.data=o.toDataURL("image/png");
  }
  cv.addEventListener("pointerdown",e=>{e.preventDefault();try{cv.setPointerCapture(e.pointerId);}catch(_){ }drawing=true;cur=[pos(e)];SIG.strokes.push(cur);ink();stroke(cur);wrap.classList.add("firmado");});
  cv.addEventListener("pointermove",e=>{if(!drawing)return;e.preventDefault();const p=pos(e),l=cur[cur.length-1];cur.push(p);ink();ctx.beginPath();ctx.moveTo(l.x,l.y);ctx.lineTo(p.x,p.y);ctx.stroke();});
  const end=()=>{if(!drawing)return;drawing=false;redraw();exportSig();update();};
  cv.addEventListener("pointerup",end); cv.addEventListener("pointercancel",end); cv.addEventListener("pointerleave",e=>{if(drawing&&!(e.buttons))end();});
  document.getElementById("sigClear").onclick=()=>{SIG.strokes=[];SIG.data="";redraw();update();};
  window.addEventListener("resize",fit); fit();
}

/* ===== Documento ===== */
function claseMax(){
  const orden={leve:1,grave:2,gravisima:3}; let m=null;
  S.cargos.forEach(c=>{ if(c.clase&&c.num&&(!m||orden[c.clase]>orden[m])) m=c.clase; });
  return m;
}
function build(){
  const fecha=fechaLarga(val("fecha"));
  const vol=val("vol");
  let h=`<table class="dochead" style="border:0;width:100%"><tr>
   <td style="border:0;vertical-align:middle;width:105px">${LOGO.ok?`<img src="${LOGO.src}" alt="Logo" style="max-height:80px;max-width:90px">`:""}</td>
   <td style="border:0;vertical-align:middle"><p style="margin:0;font-size:13pt"><b>DEFENSA CIVIL COLOMBIANA</b></p>
   <p style="margin:0">Dirección Seccional de ${ph(val("seccional"),"Departamento")}</p></td></tr></table>
  <h1>INFORME DE PRESUNTA FALTA DISCIPLINARIA DE VOLUNTARIO</h1>
  <p class="c q" style="font-size:10pt">Reglamento del Voluntario y Organizaciones de Defensa Civil (Resolución 000292 del 28 de junio de 2024)</p>

  <h2>1. Datos generales</h2>
  <p style="font-size:10pt">Informe presentado conforme a los artículos 37 y 38 del Reglamento, que permiten iniciar la acción disciplinaria por informe y obligan a quien conozca una posible falta a ponerla en conocimiento de la autoridad competente.</p>
  <table>
   <tr><td class="k">Lugar y fecha</td><td>${ph(val("ciudad"),"Ciudad")}, ${ph(fecha,"fecha")}</td></tr>
   <tr><td class="k">Dirigido a</td><td>${destHTML()}${(val("dirigido")||"seccional")==="seccional"?" (Art. 41, competente en primera instancia)":`, con traslado al Director(a) Seccional de ${ph(val("seccional"),"Departamento")}, competente en primera instancia (Art. 41)`}</td></tr>
   <tr><td class="k">Organización</td><td>${ph(val("org"),"Junta o Comité y municipio")}</td></tr>
   <tr><td class="k">Quien informa</td><td>${ph(val("inf"),"Nombre")}, ${ph(val("infcargo"),"cargo o calidad")}</td></tr>
   <tr><td class="k">Documento de identidad</td><td>${ph(val("infcc"),"Número")}</td></tr>
   <tr><td class="k">Asunto</td><td>Informe sobre presunta falta disciplinaria del voluntario ${ph(vol,"Nombre del investigado")}</td></tr>
  </table>

  <h2>2. Identificación del voluntario investigado</h2>
  <table>
   <tr><td class="k">Nombre completo</td><td>${ph(vol,"Nombre")}</td></tr>
   <tr><td class="k">Documento de identidad</td><td>${ph(val("volcc"),"Número")}</td></tr>
   <tr><td class="k">Organización</td><td>${ph(val("volorg"),"Junta o Comité")}</td></tr>
   <tr><td class="k">Calidad en la organización</td><td>${ph(val("volcal"),"Calidad")}</td></tr>
   <tr><td class="k">Nivel de escalafonamiento</td><td>${ph(val("volnivel"),"Nivel")}</td></tr>
   <tr><td class="k">Antecedentes disciplinarios (Art. 35, num. 1)</td><td>${ph(val("volant"),"Ninguno / describir")}</td></tr>
  </table>

  <h2>3. Relato de los hechos</h2>
  <table>
   <tr><td class="k">Tiempo</td><td>${ph(val("h_tiempo"),"Fecha y hora")}</td></tr>
   <tr><td class="k">Lugar</td><td>${ph(val("h_lugar"),"Lugar")}</td></tr>
   <tr><td class="k">Contexto</td><td>${ph(val("h_ctx"),"Contexto")}</td></tr>
   <tr><td class="k">Conducta</td><td>${ph(val("h_cond"),"Conducta del voluntario")}</td></tr>
   <tr><td class="k">Persona afectada o testigos</td><td>${ph(val("h_test"),"Nombres")}</td></tr>
   <tr><td class="k">Consecuencias</td><td>${ph(val("h_cons"),"Consecuencias")}</td></tr>
  </table>

  <h2>4. Falta disciplinaria atribuida</h2>
  <p style="font-size:10pt">El Art. 27 clasifica las faltas en leves (Art. 28), graves (Art. 29) y gravísimas (Art. 30).</p>`;
  S.cargos.forEach((c,i)=>{
    const F=FALTAS[c.clase]; const ok=F&&c.num;
    h+=`<table><tr><th colspan="2">Cargo ${i+1}</th></tr>
     <tr><td class="k">Clasificación</td><td>${ok?`Falta ${F.nombre.toLowerCase()}`:`<span class="ph">[Leve / grave / gravísima]</span>`}</td></tr>
     <tr><td class="k">Ubicación en el Reglamento</td><td>Resolución 000292 de 2024, Parte II, Título III, Capítulo IV (Faltas y sanciones), ${ok?`Artículo ${F.art}, numeral ${c.num}`:`<span class="ph">[Artículo y numeral]</span>`}${c.par?`, ${esc(c.par)}`:""}</td></tr>
     <tr><td class="k">En resumen</td><td>${ok?esc(RES.faltas[c.clase][c.num-1]):`<span class="ph">[Resumen]</span>`}</td></tr>
     <tr><td class="k">Texto literal de la norma</td><td>${ok?`«${esc(F.items[c.num-1])}»`:`<span class="ph">[Texto del numeral]</span>`}</td></tr>
     <tr><td class="k">Por qué los hechos encajan</td><td>${ph(c.porque,"Explicación")}</td></tr>
     <tr><td class="k">Sanción prevista</td><td>${ok?`${esc(F.sancion)} (${F.ref})`:`<span class="ph">[Sanción]</span>`}</td></tr></table>`;
  });
  const leves=S.cargos.filter(c=>c.clase==="leve"&&c.num).length, graves=S.cargos.filter(c=>c.clase==="grave"&&c.num).length;
  let reglas="";
  if(leves>=2) reglas+=`<li>Dos faltas leves cometidas por el mismo voluntario configuran una falta grave (Art. 29, num. 6).</li>`;
  if(graves>=2) reglas+=`<li>Dos faltas graves configuran una falta gravísima (Art. 30, num. 3).</li>`;
  if(S.cargos.some(c=>c.clase==="gravisima"&&["15","16","17"].includes(String(c.num)))) reglas+=`<li>Las faltas gravísimas de los numerales 15, 16 y 17 del Art. 30 son investigadas por la Procuraduría General de la Nación (parágrafo único del Art. 30).</li>`;
  if(reglas) h+=`<p style="font-size:10pt"><b>Reglas del Reglamento aplicables:</b></p><ul style="font-size:10pt">${reglas}</ul>`;

  h+=`<h2>5. Deberes, prohibiciones y principios vulnerados</h2>`;
  const rows=[];
  S.deb.slice().sort((a,b)=>a-b).forEach(i=>rows.push(["Deber del voluntario",`Art. 18, num. ${i+1}`,DEBERES[i],RES.deb[i]]));
  S.pro.slice().sort((a,b)=>a-b).forEach(i=>rows.push(["Prohibición",`Art. 19, num. ${i+1}`,PROHIB[i],RES.pro[i]]));
  S.pri.slice().sort((a,b)=>a-b).forEach(i=>rows.push([i<4?"Principio":"Valor",PRINCIPIOS[i].k,PRINCIPIOS[i].t,RES.pri[i]]));
  if(rows.length){
    h+=`<table><tr><th style="width:15%">Norma</th><th style="width:18%">Artículo y numeral</th><th style="width:25%">En resumen</th><th>Texto literal</th></tr>`+rows.map(r=>`<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${esc(r[3])}</td><td>«${esc(r[2])}»</td></tr>`).join("")+`</table>`;
    if(val("normasRel")) h+=`<p><b>Relación con los hechos:</b> ${esc(val("normasRel"))}</p>`;
  } else h+=`<p><span class="ph">[Seleccione los deberes, prohibiciones o principios vulnerados]</span></p>`;

  h+=`<h2>6. Pruebas</h2><p style="font-size:10pt">El Art. 64 admite todos los medios de prueba legalmente conocidos.</p>
  <table><tr><th style="width:6%">N.º</th><th style="width:26%">Tipo de prueba</th><th>Descripción</th><th style="width:12%">Folios</th></tr>`+
  (S.pruebas.length?S.pruebas.map((p,i)=>`<tr><td>${i+1}</td><td>${esc(p.tipo)}</td><td>${ph(p.desc,"Descripción")}</td><td>${ph(p.folios,"__")}</td></tr>`).join(""):`<tr><td colspan="4"><span class="ph">[Sin pruebas relacionadas]</span></td></tr>`)+`</table>
  <p>Pruebas que se solicita practicar: ${ph(val("pruebasSol"),"indicar o «ninguna adicional»")}.</p>`;

  h+=`<h2>7. Atenuantes y agravantes</h2>`;
  h+=`<p><b>Atenuantes (Art. 34):</b></p>`+(S.aten.length?`<ul>${S.aten.slice().sort((a,b)=>a-b).map(i=>`<li>${esc(ATEN[i])}</li>`).join("")}</ul>`:`<p style="font-size:10pt">Ninguno señalado.</p>`);
  h+=`<p><b>Agravantes (Art. 35):</b></p>`+(S.agr.length?`<ul>${S.agr.slice().sort((a,b)=>a-b).map(i=>`<li>${esc(AGRA[i])}</li>`).join("")}</ul>`:`<p style="font-size:10pt">Ninguno señalado.</p>`);
  if(val("aaObs")) h+=`<p><b>Observaciones:</b> ${esc(val("aaObs"))}</p>`;

  const m=claseMax(); const FM=m?FALTAS[m]:null;
  h+=`<h2>8. Sanción aplicable y competencia</h2>
  <p style="font-size:10pt">La decisión corresponde a la autoridad disciplinaria; este informe solo indica lo que el Reglamento prevé.</p>
  <table><tr><th>Falta</th><th>Sanción (Art. 32)</th><th>Efecto (Art. 33)</th></tr>
  ${["leve","grave","gravisima"].map(k=>`<tr${m===k?' style="background:#fff3b0"':""}><td>${FALTAS[k].nombre}</td><td>${esc(FALTAS[k].sancion)}</td><td>${esc(FALTAS[k].efecto)}</td></tr>`).join("")}</table>
  <p>Sanción que corresponde según la clasificación: ${FM?`<b>${esc(FM.sancion)}</b> (${FM.ref})`:`<span class="ph">[Se completa al elegir la falta]</span>`}.</p>
  <ul style="font-size:10pt">
   <li>Primera instancia: Director Seccional, según el lugar donde se cometió la falta (Arts. 41 y 42).</li>
   <li>Segunda instancia: Oficina de Control Interno Disciplinario de la Defensa Civil Colombiana (Arts. 41 y 71).</li>
   <li>En faltas gravísimas puede solicitarse la suspensión provisional hasta por tres meses al Subdirector Operativo (Art. 74).</li>
   <li>Con confesión o aceptación de cargos la sanción puede rebajarse hasta en la mitad, salvo en faltas leves (Art. 65).</li></ul>

  <h2>9. Solicitud</h2>
  <p>Con fundamento en los artículos 37, 38 y 67 del Reglamento, se solicita respetuosamente ${(val("dirigido")||"seccional")==="seccional"?"al Director Seccional":`a ${val("dirigido")==="junta_dir"?"la ":""}${destHTML()}, dar traslado de este informe al Director Seccional de ${ph(val("seccional"),"Departamento")}, competente en primera instancia (Art. 41), y a este`}:</p>
  <ol><li>Estudiar este informe dentro de los cinco días hábiles siguientes a su recepción (Art. 67).</li>
  <li>Disponer el auto de citación a audiencia al voluntario ${ph(vol,"nombre")}, si encuentra mérito (Art. 68).</li>
  <li>Practicar las pruebas relacionadas en el punto 6 y las que considere necesarias.</li>
  ${val("peticion")?`<li>${esc(val("peticion"))}</li>`:""}</ol>
  <p>Notificaciones: ${ph(val("notif"),"dirección, correo electrónico y teléfono")}.</p>
  <p>Anexos: ${ph(val("anexos"),"lista de documentos y folios")}.</p>
  <p style="margin-top:20px">Cordialmente,</p>
  <div style="height:85px;display:flex;align-items:flex-end">${SIG.data?`<img src="${SIG.data}" alt="Firma" style="max-height:80px;max-width:280px">`:""}</div>
  <div class="sig" style="margin-top:0"><b>${ph(val("inf"),"Nombre completo")}</b><br>${ph(val("infcargo"),"Calidad o cargo")} · C.C. ${ph(val("infcc"),"número")}<br>${ph(val("org"),"Organización")}</div>`;
  return h;
}
function update(){ syncDest(); document.getElementById("sheet").innerHTML=build(); save(); }

/* ===== Acciones ===== */
document.getElementById("bPrint").onclick=()=>window.print();
document.getElementById("bDoc").onclick=()=>{
  const css="body{font-family:Arial;font-size:11pt}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:4px 6px;font-size:10pt;vertical-align:top}th{background:#0661A2;color:#fff}td.k{background:#fff1d6;font-weight:bold}h1{font-size:14pt;text-align:center;color:#0661A2;border-bottom:3px solid #F19800}h2{font-size:12pt;color:#0661A2;border-left:5px solid #F19800;padding-left:6px}.c{text-align:center}.ph{background:#ffe3a6}.sig{margin-top:50px;border-top:1px solid #000;width:60%}";
  let body=document.getElementById("sheet").innerHTML;
  try{ if(LOGO.ok && !LOGO.src.startsWith("data:")){ const im=document.getElementById("logoImg"), cv=document.createElement("canvas"); cv.width=im.naturalWidth; cv.height=im.naturalHeight; cv.getContext("2d").drawImage(im,0,0); body=body.split(LOGO.src).join(cv.toDataURL("image/png")); } }catch(e){}
  const html=`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>Informe</title><style>${css}</style></head><body>${body}</body></html>`;
  const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob(["﻿"+html],{type:"application/msword"}));
  a.download="Informe_Falta_Voluntario.doc"; document.body.appendChild(a); a.click(); a.remove();
};
document.getElementById("bCopy").onclick=async()=>{
  const t=document.getElementById("sheet").innerText;
  try{ await navigator.clipboard.writeText(t); alert("Texto copiado."); }catch(e){ const r=document.createRange(); r.selectNodeContents(document.getElementById("sheet")); const s=getSelection(); s.removeAllRanges(); s.addRange(r); alert("Seleccionado. Use Ctrl+C para copiar."); }
};
document.getElementById("bClear").onclick=()=>{
  if(!confirm("¿Borrar todos los datos del informe?")) return;
  try{localStorage.removeItem(KEY);}catch(e){} location.reload();
};
document.getElementById("addCargo").onclick=()=>{S.cargos.push({clase:"",num:"",par:"",porque:""}); renderCargos(); update();};
document.getElementById("addPrueba").onclick=()=>{S.pruebas.push({tipo:"Documental",desc:"",folios:""}); renderPruebas(); update();};
TEXT_IDS.forEach(i=>{ const el=document.getElementById(i); el.addEventListener("input",update); el.addEventListener("change",update); });

/* ===== Inicio ===== */
load();
if(!document.getElementById("fecha").value){ const d=new Date(); document.getElementById("fecha").value=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
renderCargos(); renderPruebas(); initLogo(); initSig();
checks("listDeb",DEBERES,"deb",(t,i)=>`Num. ${i+1}: ${RES.deb[i]}`);
checks("listPro",PROHIB,"pro",(t,i)=>`Num. ${i+1}: ${RES.pro[i]}`);
checks("listPriA",PRINCIPIOS.slice(0,4),"pri",(t,i)=>`${t.k.replace("Art. 6, literal ","").replace(/^([a-d]) \((.*)\)$/,"$1) $2")}: ${RES.pri[i]}`,0);
checks("listPriB",PRINCIPIOS.slice(4),"pri",(t,i)=>`${t.k.replace("Art. 7, literal ","").replace(/^([a-i]) \((.*)\)$/,"$1) $2")}: ${RES.pri[i+4]}`,4);
checks("listAten",ATEN,"aten",t=>t);
checks("listAgr",AGRA,"agr",t=>t);
update();
