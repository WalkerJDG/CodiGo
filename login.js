document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailEl = document.getElementById('email');
  const passEl = document.getElementById('password');
  const eEmail = document.getElementById('err-email');
  const ePass = document.getElementById('err-pass');

  function showError(el, msgEl, msg) {
    msgEl.textContent = msg;
    el.style.boxShadow = '0 0 0 2px rgba(255,0,0,.6)';
  }
  function clearError(el, msgEl) {
    msgEl.textContent = '';
    el.style.boxShadow = '';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = emailEl.value.trim();
    const pass = passEl.value.trim();

    clearError(emailEl, eEmail);
    clearError(passEl, ePass);

    if (!email) { showError(emailEl, eEmail, 'Ingresa tu correo'); return; }
    if (!pass) { showError(passEl, ePass, 'Ingresa tu contraseña'); return; }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === pass);

    if (!user) {
      showError(emailEl, eEmail, 'Correo o contraseña incorrectos');
      return;
    }

    localStorage.setItem('usuarioActivo', JSON.stringify(user));
    alert('Bienvenido ' + user.name + ' 👋');
    window.location.href = 'dashboard.html';
  });
});
