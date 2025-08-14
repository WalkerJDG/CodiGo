document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validación: campos vacíos
        if (!email || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Validación: formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // Validación: longitud de contraseña
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        // Verificar usuario en localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            alert("Correo o contraseña incorrectos.");
            return;
        }

        // Guardar sesión activa
        localStorage.setItem('usuarioActivo', JSON.stringify(user));

        alert(`Bienvenido ${user.name}`);
        window.location.href = 'dashboard.html';
    });
});
