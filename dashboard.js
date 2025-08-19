document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('usuarioActivo'));
  const welcomeUser = document.getElementById('welcomeUser');
  const logoutBtn = document.getElementById('logoutBtn');
  const courseList = document.getElementById('courseList');
  const myCoursesList = document.getElementById('myCoursesList');
  const searchInput = document.getElementById('searchInput');

  // Si no hay usuario activo, redirige al login
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  welcomeUser.textContent = `Bienvenido, ${user.name} 👋`;

  // Cursos de ejemplo
  const courses = [
    { id: 1, title: "JavaScript Básico" },
    { id: 2, title: "HTML & CSS desde cero" },
    { id: 3, title: "React Avanzado" },
    { id: 4, title: "Python para principiantes" },
    { id: 5, title: "Bases de Datos SQL" },
  ];

  let myCourses = JSON.parse(localStorage.getItem('misCursos') || '[]');

  function renderCourses(filter = "") {
    courseList.innerHTML = "";
    courses
      .filter(c => c.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${c.title}</span>
          <button class="btn btn-light" data-id="${c.id}">Inscribirme</button>
        `;
        courseList.appendChild(li);
      });
  }

  function renderMyCourses() {
    myCoursesList.innerHTML = "";
    myCourses.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${c.title}</span>
        <span>
          <button class="btn btn-light" data-action="open" data-id="${c.id}">Abrir</button>
          <button class="btn btn-outline" data-action="remove" data-id="${c.id}">Quitar</button>
        </span>
      `;
      myCoursesList.appendChild(li);
    });
    localStorage.setItem('misCursos', JSON.stringify(myCourses));
  }

  // Eventos
  courseList.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.dataset.id);
      const course = courses.find(c => c.id === id);
      if (!myCourses.find(c => c.id === id)) {
        myCourses.push(course);
        renderMyCourses();
      }
    }
  });

  myCoursesList.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.dataset.id);
      if (e.target.dataset.action === "remove") {
        myCourses = myCourses.filter(c => c.id !== id);
        renderMyCourses();
      }
      if (e.target.dataset.action === "open") {
        alert("Abriendo curso: " + myCourses.find(c => c.id === id).title);
      }
    }
  });

  searchInput.addEventListener("input", e => {
    renderCourses(e.target.value);
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
  });

  // Inicializa
  renderCourses();
  renderMyCourses();
});
