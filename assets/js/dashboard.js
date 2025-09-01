/* =========================================================
   dashboard.js — Lógica de catálogo y progreso por curso
   - Progreso y XP únicos por curso en localStorage
   - Niveles 1–3. Umbrales: 0,100,200 XP
   ========================================================= */

// ----- Modelo / datos base -----
const cursosCatalogo = [
  { id: 1, slug: "css", titulo: "CSS Moderno", desc: "Diseña interfaces modernas con flexbox y grid.", duracion: "2h" },
  { id: 2, slug: "js",  titulo: "JavaScript Básico", desc: "Agrega vida con interactividad y lógica.", duracion: "2h" },
  { id: 3, slug: "git", titulo: "Git & GitHub", desc: "Colabora en equipo con control de versiones pro.", duracion: "1h" },
];

const LS_MIS_CURSOS = "misCursos";     // array de { id, xp }
const LS_CURSO_ACTIVO = "cursoActivo"; // id curso activo

// ----- Utilidades XP/Nivel -----
const getLevel = (xp=0) => (xp >= 200 ? 3 : xp >= 100 ? 2 : 1);
const levelProgressPct = (xp=0) => Math.min(100, xp % 100); // progreso dentro del nivel actual

// ----- Estado -----
let misCursos = JSON.parse(localStorage.getItem(LS_MIS_CURSOS) || "[]");

// ----- Guardado -----
function save() {
  localStorage.setItem(LS_MIS_CURSOS, JSON.stringify(misCursos));
}

// ----- Render -----
function render() {
  const $avail = document.getElementById("available-section");
  const $mine  = document.getElementById("my-section");
  $avail.innerHTML = "";
  $mine.innerHTML  = "";

  // Render disponibles (los que no están en misCursos)
  cursosCatalogo.forEach(c => {
    const ya = misCursos.find(m => m.id === c.id);
    if (ya) return; // no mostrar en disponibles

    $avail.appendChild(cardDisponible(c));
  });

  // Render "mis cursos"
  if (misCursos.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = `<p class="helper">Todavía no te inscribiste en ningún curso.</p>`;
    $mine.appendChild(empty);
  } else {
    misCursos.forEach(m => {
      const c = cursosCatalogo.find(cc => cc.id === m.id);
      if (!c) return;
      $mine.appendChild(cardMio(c, m));
    });
  }
}

function cardDisponible(curso) {
  const card = document.createElement("div");
  card.className = "card course-card";
  card.innerHTML = `
    <span class="level">Lv 1</span>
    <h3>${curso.titulo}</h3>
    <p>${curso.desc}</p>
    <span class="tag">Duración: ${curso.duracion}</span>
    <div class="progress-bar"><div class="progress" style="width:0%"></div></div>
    <div class="actions">
      <button class="btn btn-primary">Inscribirme</button>
      <button class="btn btn-secondary">Preview</button>
    </div>
  `;
  const [btnIns, btnPrev] = card.querySelectorAll("button");
  btnIns.onclick = () => {
    if (!misCursos.find(m => m.id === curso.id)) {
      misCursos.push({ id: curso.id, xp: 0 });
      save(); render();
    }
  };
  btnPrev.onclick = () => alert(`📘 ${curso.titulo}\n\n${curso.desc}\nDuración: ${curso.duracion}`);
  return card;
}

function cardMio(curso, data) {
  const xp = data.xp || 0;
  const lvl = getLevel(xp);
  const pct = levelProgressPct(xp);

  const card = document.createElement("div");
  card.className = "card course-card";
  card.innerHTML = `
    <span class="level">Lv ${lvl}</span>
    <h3>${curso.titulo}</h3>
    <p>${curso.desc}</p>
    <span class="tag">Duración: ${curso.duracion}</span>
    <div class="progress-bar"><div class="progress" style="width:${pct}%"></div></div>
    <div class="actions">
      <button class="btn btn-primary">Abrir</button>
      <button class="btn btn-secondary">Preview</button>
      <button class="btn btn-danger">Cancelar</button>
    </div>
    <div class="helper">XP: ${xp} • Progreso de nivel: ${pct}%</div>
  `;
  const [btnAbrir, btnPrev, btnCancel] = card.querySelectorAll("button");
  btnAbrir.onclick = () => {
    localStorage.setItem(LS_CURSO_ACTIVO, String(curso.id));
    window.location.href = "curso.html";
  };
  btnPrev.onclick = () => alert(`📘 ${curso.titulo}\n\n${curso.desc}\nDuración: ${curso.duracion}\n\nTu XP: ${xp} (Lv ${lvl})`);
  btnCancel.onclick = () => {
    if (!confirm("¿Cancelar e iniciar desde 0? Perderás tu XP de este curso.")) return;
    misCursos = misCursos.filter(m => m.id !== curso.id);
    save(); render();
  };
  return card;
}

// Simulación de cerrar sesión (limpia inscripciones si quieres)
document.getElementById("btn-logout").addEventListener("click", () => {
  if (!confirm("¿Seguro que deseas cerrar sesión?")) return;
  // Sólo ejemplo: no borro cursos; si quieres limpiar: localStorage.clear();
  alert("Sesión cerrada.");
});

// Init
render();
