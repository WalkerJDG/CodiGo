/* =========================================================
   curso.js — Lógica del curso: consola, quiz y XP por curso
   - Curso activo tomado del localStorage
   - Suma XP al aprobar; niveles 1–3 (0/100/200)
   ========================================================= */
const LS_MIS_CURSOS = "misCursos";
const LS_CURSO_ACTIVO = "cursoActivo";

const cursosCatalogo = [
  { id: 1, titulo: "CSS Moderno" },
  { id: 2, titulo: "JavaScript Básico" },
  { id: 3, titulo: "Git & GitHub" },
];

const getLevel = (xp=0) => (xp >= 200 ? 3 : xp >= 100 ? 2 : 1);
const levelProgressPct = (xp=0) => Math.min(100, xp % 100);

// ---- Estado base ----
let misCursos = JSON.parse(localStorage.getItem(LS_MIS_CURSOS) || "[]");
const idActivo = Number(localStorage.getItem(LS_CURSO_ACTIVO) || "0") || (misCursos[0]?.id ?? 1);
if (!localStorage.getItem(LS_CURSO_ACTIVO)) localStorage.setItem(LS_CURSO_ACTIVO, String(idActivo));

let cursoData = misCursos.find(m => m.id === idActivo);
if (!cursoData) {
  // Si se abrió directo sin inscribirse, lo agregamos en nivel 1.
  cursoData = { id: idActivo, xp: 0 };
  misCursos.push(cursoData);
  localStorage.setItem(LS_MIS_CURSOS, JSON.stringify(misCursos));
}

const cursoInfo = cursosCatalogo.find(c => c.id === idActivo) || { titulo:"Curso" };

// ---- UI refs ----
const $titulo = document.getElementById("titulo-curso");
const $pillCurso = document.getElementById("pill-curso");
const $pillNivel = document.getElementById("pill-nivel");
const $helper = document.getElementById("helper-xp");
const $pb = document.getElementById("pb");
const $out = document.getElementById("console-out");
const $code = document.getElementById("code-area");

// ---- Inicializar cabecera ----
function refreshHeader(){
  const xp = cursoData.xp || 0;
  const lvl = getLevel(xp);
  const pct = levelProgressPct(xp);
  $titulo.textContent = cursoInfo.titulo;
  $pillCurso.textContent = cursoInfo.titulo;
  $pillNivel.textContent = `Lv ${lvl}`;
  $helper.textContent = `XP: ${xp} • Progreso: ${pct}%`;
  $pb.style.width = `${pct}%`;
}
refreshHeader();

// ---- Consola ----
document.getElementById("run-code").addEventListener("click", () => {
  const code = $code.value.trim();
  if (code.length < 20) {
    toast("El código es demasiado corto. Agrega más líneas para probar.", false);
    return;
  }
  // Mostramos el HTML como texto (no lo ejecutamos para mantenerlo seguro)
  $out.innerHTML = code;
  toast("Código enviado a la consola virtual.");
});

document.getElementById("clear-console").addEventListener("click", () => {
  $out.textContent = "";
});

// Función de ejemplo solicitada (puedes llamarla en la consola del navegador)
window.ejemploCurso = function ejemploCurso(){
  const msg = [
    "ejemploCurso()",
    "=================",
    "Este es un ejemplo rápido.",
    "Suma de 2 + 3 =", 2+3,
    "Etiqueta semántica sugerida: <main>"
  ].join("\n");
  console.log(msg);
  return msg;
};

// ---- Quiz ----
const respuestasCorrectas = { q1:"main", q2:"alt", q3:"footer" };

document.getElementById("quiz-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Validación: todo respondido
  const fd = new FormData(e.currentTarget);
  const ans = { q1: fd.get("q1"), q2: fd.get("q2"), q3: fd.get("q3") };
  if (!ans.q1 || !ans.q2 || !ans.q3) {
    setFeedback("Responde todas las preguntas antes de enviar.", false);
    return;
  }

  // Calificación
  let aciertos = 0;
  Object.keys(respuestasCorrectas).forEach(k => {
    if (ans[k] === respuestasCorrectas[k]) aciertos++;
  });

  const xpGanada = aciertos * 40; // cada correcta = 40 XP (3 correctas = 120 XP → sube un nivel)
  addXP(xpGanada);

  const msg = `Has acertado ${aciertos}/3. +${xpGanada} XP ${aciertos===3 ? "💥" : ""}`;
  setFeedback(msg, aciertos >= 2);
});

document.getElementById("reset-quiz").addEventListener("click", () => {
  document.getElementById("quiz-form").reset();
  setFeedback("", true);
});

function setFeedback(text, ok){
  const el = document.getElementById("quiz-feedback");
  el.textContent = text;
  el.className = "feedback " + (ok ? "ok" : "bad");
}

// ---- XP / Nivel ----
function addXP(amount){
  if (!amount || amount <= 0) return;
  cursoData.xp = Math.min(240, (cursoData.xp || 0) + amount); // cap ligero para evitar overflow
  // Persistir
  misCursos = misCursos.map(m => m.id === cursoData.id ? cursoData : m);
  localStorage.setItem(LS_MIS_CURSOS, JSON.stringify(misCursos));
  refreshHeader();
  toast(`XP +${amount}. Nivel actual: ${getLevel(cursoData.xp)}.`);
}

function toast(text, positive = true){
  const t = document.createElement("div");
  t.textContent = text;
  t.style.position="fixed";
  t.style.right="16px";
  t.style.bottom="16px";
  t.style.padding="10px 14px";
  t.style.borderRadius="12px";
  t.style.fontWeight="800";
  t.style.background = positive
    ? "linear-gradient(90deg, var(--brand-2), var(--accent))"
    : "linear-gradient(90deg, #fda4af, #fecaca)";
  t.style.color="#0b1220";
  t.style.boxShadow="0 8px 20px rgba(0,0,0,.35)";
  t.style.zIndex="1000";
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 2200);
}
