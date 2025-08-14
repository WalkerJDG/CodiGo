document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    if (!usuarioActivo) {
        alert("Debes iniciar sesión para acceder al dashboard.");
        window.location.href = 'login.html';
        return;
    }

    // ID corregido
    const userNameElement = document.getElementById('usernameDisplay');
    if (userNameElement) {
        userNameElement.textContent = usuarioActivo.name;
    }

    // ID corregido
    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('usuarioActivo');
            alert("Sesión cerrada.");
            window.location.href = 'login.html';
        });
    }
});
