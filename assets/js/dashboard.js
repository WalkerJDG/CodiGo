/* Dashboard JS (gamer green/cyan)
 - Shows available courses
 - Subscribe / Open / Cancel
 - Shows per-course XP progress and computed Level
 - Stores subscriptions in localStorage key 'codiGo_my'
 - XP for courses saved as 'exp_<Course Title>' as 0-100 (best score)
*/

const COURSES = [
  { id: "html", title: "HTML Básico", desc: "Estructura, semántica y formularios." },
  { id: "css",  title: "CSS Moderno",  desc: "Grid, Flexbox y animaciones modernas." },
  { id: "js",   title: "JavaScript Básico", desc: "Eventos, DOM, lógica y debugging." },
  { id: "git",  title: "Git & GitHub", desc: "Ramas, commits y workflow colaborativo." }
];

const MY_KEY = "codiGo_my";

document.addEventListener("DOMContentLoaded", ()=>{
  renderAvailable();
  renderMine();
  updateUserBadge();
});

// helpers
function getMy(){ return JSON.parse(localStorage.getItem(MY_KEY) || "[]"); }
function setMy(arr){ localStorage.setItem(MY_KEY, JSON.stringify(arr)); }
function xpFor(title){ return parseInt(localStorage.getItem(`exp_${title}`) || "0"); }
function levelFromXp(xp){ return 1 + Math.floor(xp / 20); } // every 20% -> new level

// render available courses
function renderAvailable(){
  const el = document.getElementById("availableGrid");
  el.innerHTML = "";
  COURSES.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="meta">
        <div class="pill">Duración: 1-2h</div>
        <div class="pill">Nivel: Intro</div>
      </div>
      <div class="actionsRow">
        <button class="btn small primary" data-act="ins" data-id="${c.id}">Inscribirme</button>
        <button class="btn small ghost" data-act="preview" data-id="${c.id}">Vista</button>
      </div>
    `;
    el.appendChild(card);
  });

  // delegate clicks
  el.onclick = (ev) => {
    const b = ev.target.closest("button");
    if(!b) return;
    const act = b.dataset.act, id = b.dataset.id;
    if(act === "ins") subscribe(id);
    if(act === "preview") preview(id);
  }
}

// render my courses
function renderMine(){
  const el = document.getElementById("myGrid");
  el.innerHTML = "";
  const my = getMy();
  if(my.length === 0){
    el.innerHTML = `<div class="card"><p class="pill">Aún no te has inscrito. ¡Elige un curso!</p></div>`;
    return;
  }
  my.forEach(id => {
    const c = COURSES.find(x=>x.id===id);
    const xp = xpFor(c.title);
    const lvl = levelFromXp(xp);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="levelTag">Lv ${lvl}</div>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="progressMini"><div style="width:${xp}%"></div></div>
      <div class="actionsRow">
        <button class="btn small primary" data-act="open" data-id="${c.id}">Abrir</button>
        <button class="btn small danger" data-act="cancel" data-id="${c.id}">Cancelar</button>
      </div>
    `;
    el.appendChild(card);
  });

  // delegate actions
  el.onclick = (ev) => {
    const b = ev.target.closest("button");
    if(!b) return;
    const act = b.dataset.act, id = b.dataset.id;
    if(act === "open") openCourse(id);
    if(act === "cancel") cancelCourse(id);
  }
}

// actions
function subscribe(id){
  const arr = getMy();
  if(!arr.includes(id)){
    arr.push(id);
    setMy(arr);
    renderMine();
    toast("Inscrito ✅");
  } else toast("Ya inscrito ⚠️");
}

function cancelCourse(id){
  let arr = getMy();
  arr = arr.filter(x => x !== id);
  setMy(arr);
  renderMine();
  toast("Cancelado ❌");
}

function openCourse(id){
  const c = COURSES.find(x=>x.id===id);
  if(!c) return toast("Curso no encontrado");
  // store friendly title
  localStorage.setItem("cursoActivo", c.title);
  window.location.href = "curso.html";
}

function preview(id){
  const c = COURSES.find(x=>x.id===id);
  if(!c) return;
  toast(`${c.title}\n\n${c.desc}`);
}

function updateUserBadge(){
  const u = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
  const el = document.getElementById("userBadge");
  if(u && u.name) el.textContent = `${u.name} · dev`;
  else el.textContent = "Invitado";
}

function toast(msg){ /* simple toast */ alert(msg); }

function cerrarSesion(){
  localStorage.removeItem("usuarioActivo");
  window.location.href = "../login.html";
}
