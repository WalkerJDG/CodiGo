/* curso.js (gamer green/cyan) - FINAL
 - Loads one page for all 4 courses (title taken from localStorage.cursoActivo)
 - Editor executes HTML/JS in iframe, console shows logs and errors
 - Quiz displays always; choosing options shows immediate feedback
 - Finish quiz saves best XP (0-100), computes level and redirects to dashboard
 - Buttons: load example, copy example, reset editor
*/

// Full courses data (4)
const COURSES = {
  "HTML Básico": {
    title: "HTML Básico",
    subtitle: "Estructura y semántica",
    theory: `HTML (HyperText Markup Language) estructura contenido. Usa etiquetas semánticas para accesibilidad y SEO.`,
    example: `<!doctype html>
<html><head><meta charset="utf-8"><title>Ejemplo HTML</title></head>
<body>
  <h1>Hola mundo</h1>
  <p>Demo con console.log</p>
  <script>console.log("Hola desde el ejemplo HTML");</script>
</body></html>`,
    runnable: true,
    quiz: [
      { pregunta: "¿Qué etiqueta crea un párrafo?", opciones: ["<p>", "<div>", "<span>", "<text>"], respuesta: "<p>" },
      { pregunta: "¿Qué atributo mejora accesibilidad en <img>?", opciones: ["alt", "src", "title", "href"], respuesta: "alt" }
    ]
  },
  "CSS Moderno": {
    title: "CSS Moderno",
    subtitle: "Grid, Flexbox y animaciones",
    theory: `CSS controla presentación. Usa variables (:root), Flexbox para componentes y Grid para layouts complejos.`,
    example: `<style>
body{display:grid;place-items:center;height:100vh;background:linear-gradient(90deg,#00f0ff,#00e676)} 
.card{padding:20px;border-radius:12px;background:rgba(0,0,0,0.2);color:#fff}
</style>
<div class="card"><h1>CSS Demo</h1></div>
<script>console.log("CSS example loaded")</script>`,
    runnable: true,
    quiz: [
      { pregunta: "¿Cuál activa Flexbox?", opciones: ["display:flex", "flex:1", "layout:flex", "flexbox:true"], respuesta: "display:flex" },
      { pregunta: "¿Qué selector define variables globales?", opciones: [":root", ".vars", "#root", "@vars"], respuesta: ":root" }
    ]
  },
  "JavaScript Básico": {
    title: "JavaScript Básico",
    subtitle: "Eventos, DOM y depuración",
    theory: `JS añade comportamiento: eventos, DOM y lógica. Depura con console.log y maneja errores con try/catch.`,
    example: `<button id="b">Click</button>
<script>
document.getElementById('b').addEventListener('click', ()=> {
  console.log("Botón pulsado - demo JS");
  alert("Hola desde JS");
});
</script>`,
    runnable: true,
    quiz: [
      { pregunta: "¿Cómo imprimo en consola?", opciones: ["console.log()", "print()", "echo()", "log()"], respuesta: "console.log()" },
      { pregunta: "¿Qué objeto representa el documento HTML?", opciones: ["document", "window", "dom", "html"], respuesta: "document" }
    ]
  },
  "Git & GitHub": {
    title: "Git & GitHub",
    subtitle: "Control de versiones",
    theory: `Git mantiene historial de cambios. Flujo: init → add → commit → push. Usar ramas para features.`,
    example: `# git init
git add .
git commit -m "init"
git push origin main`,
    runnable: false,
    quiz: [
      { pregunta: "¿Qué comando hace un commit?", opciones: ["git commit", "git save", "git push", "git add"], respuesta: "git commit" },
      { pregunta: "¿Qué servicio aloja repositorios?", opciones: ["GitHub", "Heroku", "Netlify", "Docker"], respuesta: "GitHub" }
    ]
  }
};

// ---- load course ----
const courseName = localStorage.getItem("cursoActivo") || "HTML Básico";
const course = COURSES[courseName] || COURSES["HTML Básico"];
const xpKey = `exp_${course.title}`;
let xp = parseInt(localStorage.getItem(xpKey) || "0");

// DOM refs
const titleEl = document.getElementById("courseTitle");
const subtitleEl = document.getElementById("courseSubtitle");
const theoryEl = document.getElementById("theory");
const exampleEl = document.getElementById("example");
const editorEl = document.getElementById("editor");
const outputEl = document.getElementById("output");
const consoleEl = document.getElementById("console");
const quizEl = document.getElementById("quiz");
const finishBtn = document.getElementById("finishBtn");
const xpBadge = document.getElementById("xpBadge");
const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");
const loadExampleBtn = document.getElementById("loadExample");
const copyExampleBtn = document.getElementById("copyExample");

document.addEventListener("DOMContentLoaded", () => {
  // header
  titleEl.textContent = course.title;
  subtitleEl.textContent = course.subtitle;
  xpBadge.textContent = `XP: ${xp}`;

  // theory & example
  theoryEl.textContent = course.theory;
  exampleEl.textContent = course.example;

  // editor (runnable)
  if (course.runnable) {
    editorEl.value = course.example;
  } else {
    // hide editor card if not runnable (e.g. Git)
    const editorCard = document.querySelector(".right-col .card");
    if (editorCard) editorCard.style.display = "none";
  }

  renderQuiz(course.quiz);
  attachHandlers();
});

// ---------- Run, Console ----------
let messageInstalled = false;
function attachHandlers(){
  if (runBtn) runBtn.addEventListener("click", runCode);
  if (resetBtn) resetBtn.addEventListener("click", ()=> { if(course.runnable) editorEl.value = course.example; runCode(); });
  if (loadExampleBtn) loadExampleBtn.addEventListener("click", ()=> { if(course.runnable) editorEl.value = course.example; });
  if (copyExampleBtn) copyExampleBtn.addEventListener("click", ()=> navigator.clipboard?.writeText(course.example).then(()=> alert("Ejemplo copiado")));
  if (finishBtn) finishBtn.addEventListener("click", finishQuiz);

  if (!messageInstalled) {
    window.addEventListener("message", (e) => {
      if (!e.data) return;
      const d = document.createElement("div");
      d.className = "line " + (e.data.type === "err" ? "err" : "log");
      d.textContent = (e.data.type === "err" ? "❌ " : "▶ ") + e.data.msg;
      consoleEl.appendChild(d);
      consoleEl.scrollTop = consoleEl.scrollHeight;
    });
    messageInstalled = true;
  }
}

function runCode(){
  if (!course.runnable) { alert("Este curso no ejecuta código en el navegador."); return; }
  const code = editorEl.value || "";
  consoleEl.innerHTML = "";
  const payload = `<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
(function(){
  const orig = console.log;
  console.log = function(){ orig.apply(console,arguments); parent.postMessage({type:'log', msg: Array.from(arguments).join(' ')}, '*'); };
  window.onerror = function(msg, src, line, col){ parent.postMessage({type:'err', msg: msg + ' ('+line+':'+col+')'}, '*'); };
})();
</script>
${code}
</body></html>`;
  outputEl.srcdoc = payload;
}

// ---------- Quiz ----------
function renderQuiz(list){
  quizEl.innerHTML = "";
  list.forEach((q, idx) => {
    const item = document.createElement("div");
    item.className = "quiz-item";
    const p = document.createElement("p");
    p.innerHTML = `<strong>${idx+1}.</strong> ${q.pregunta}`;
    item.appendChild(p);

    q.opciones.forEach(opt => {
      const label = document.createElement("label");
      label.className = "quiz-opt";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q_${idx}`;
      input.value = opt;
      input.style.marginRight = "8px";

      input.addEventListener("change", () => {
        item.querySelectorAll(".quiz-opt").forEach(el => el.classList.remove("correct","wrong"));
        if (opt === q.respuesta) label.classList.add("correct");
        else label.classList.add("wrong");
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      item.appendChild(label);
    });

    quizEl.appendChild(item);
  });
}

// ---------- Finish quiz -> save XP and redirect ----------
function finishQuiz(){
  const answers = course.quiz;
  let correct = 0;
  answers.forEach((q, idx) => {
    const sel = document.querySelector(`input[name="q_${idx}"]:checked`);
    if (sel && sel.value === q.respuesta) correct++;
  });
  const scorePct = Math.round((correct / answers.length) * 100);
  alert(`Resultado: ${correct}/${answers.length} (${scorePct}%)`);
  if (scorePct > xp) {
    xp = scorePct;
    localStorage.setItem(xpKey, xp);
  }
  // redirect after tiny delay so alert shows
  setTimeout(()=> { window.location.href = "dashboard.html"; }, 200);
}

// ---------- nav ----------
function volverDashboard(){ window.location.href = "dashboard.html"; }
