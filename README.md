# 🚀 CodiGo – Plataforma de Cursos Interactivos

Proyecto académico desarrollado por **Juan Daniel Gómez Correa**, estudiante del **SENA – Programación de Software**, con el objetivo de aplicar **buenas prácticas de desarrollo frontend** en una aplicación educativa web.

---

## 📖 Descripción

**CodiGo** es una plataforma educativa interactiva que permite a los estudiantes **aprender practicando** directamente en el navegador.  
El proyecto se centra en el diseño de una interfaz clara, moderna y accesible, que aplique estándares profesionales de **front-end**.

CodiGo se basa en:

- Una **arquitectura frontend modular** con separación clara de HTML, CSS y JS.  
- El uso de **localStorage** para gestionar usuarios, cursos y progreso sin necesidad de un backend.  
- Una **consola interactiva** que interpreta código HTML y muestra el resultado visual, tal como lo haría un navegador.  
- Un sistema de **XP y niveles** para gamificar el aprendizaje.  

---

## ✨ Características principales del sitio

- 🔐 **Autenticación de usuarios**  
  - Registro con validaciones (correo y contraseñas seguras).  
  - Inicio de sesión con persistencia en `localStorage`.  

- 🏠 **Dashboard dinámico**  
  - Visualización de cursos disponibles.  
  - Acceso a **Mis cursos** con progreso guardado.  
  - Sistema de **niveles y experiencia (XP)** para motivar el aprendizaje.  

- 📚 **Gestión de cursos**  
  - Cada curso incluye descripción, etiquetas y nivel de dificultad.  
  - Barra de progreso visual para ver el avance en tiempo real.  
  - Posibilidad de reiniciar o continuar un curso.  

- 💻 **Consola interactiva**  
  - Los estudiantes escriben código en un editor de texto.  
  - Al ejecutar, la salida muestra **el resultado renderizado** (ejemplo: `<p>Hola</p>` → muestra **Hola**).  
  - Inspirada en una terminal real con diseño de botones (estilo macOS).  

- 🎨 **Interfaz moderna y accesible**  
  - Paleta de colores pastel en **modo oscuro** para evitar fatiga visual.  
  - Botones con gradientes animados y efectos hover elegantes.  
  - Textos secundarios (`.helper`, `.footer`) con animaciones de color sutiles.  
  - Diseño **responsive**: se adapta a móviles, tablets y escritorio.  

- 📊 **Persistencia local**  
  - Toda la información de usuarios y progreso se guarda en `localStorage`.  
  - Los datos se mantienen aunque se cierre o reinicie el navegador.  

---

## 📂 Estructura del Proyecto

📦 CodiGo
┣ 📜 index.html # Login de usuarios
┣ 📜 register.html # Registro de cuentas
┣ 📜 dashboard.html # Panel de cursos y progreso
┣ 📜 curso.html # Vista del curso + consola
┣ 📂 assets
┃ ┣ 📂 css
┃ ┃ ┣ auth.css # Estilos para login/registro
┃ ┃ ┗ main.css # Estilos globales (dashboard/cursos)
┃ ┣ 📂 js
┃ ┃ ┣ login.js # Lógica de autenticación
┃ ┃ ┣ register.js # Registro y validaciones
┃ ┃ ┣ dashboard.js # Gestión de cursos y progreso
┃ ┃ ┗ curso.js # Consola interactiva y dinámicas


---

## 🛠️ Tecnologías utilizadas

- **HTML5 semántico**  
- **CSS3 moderno** → variables, flexbox, grid, animaciones, gradientes  
- **JavaScript (ES6+)** → manipulación del DOM, validaciones, almacenamiento local  

---

## 🎨 Buenas Prácticas de Frontend Aplicadas

### 📑 HTML
- Uso de **etiquetas semánticas** (`header`, `main`, `section`, `footer`, `nav`).  
- Formularios accesibles con validaciones y mensajes de error claros.  
- Separación de estructura y estilos (sin estilos inline).  

### 🎨 CSS
- **Variables globales (`:root`)** para paleta de colores → fácil mantenimiento.  
- **Responsive design** con `flexbox` y `grid`.  
- **Animaciones suaves** con `@keyframes` (botones y títulos).  
- Paleta en **modo oscuro pastel** → evita fatiga visual y mejora accesibilidad.  
- Eliminación de duplicados y código innecesario.  
- Clases reutilizables (`.btn`, `.card`, `.badge`) para consistencia.  

### ⚡ JavaScript
- Código **modular y organizado**: cada archivo `.js` se encarga de una responsabilidad.  
- **Validaciones de formularios** con expresiones regulares para emails y contraseñas.  
- Uso de `localStorage` para guardar usuarios, cursos y progreso.  
- Funciones reutilizables y documentadas.  
- DOM dinámico → feedback inmediato al usuario sin recargar la página.  

### ♿ Accesibilidad y UX
- Contraste de colores validado (texto legible sobre fondos oscuros).  
- Botones accesibles: eliminados subrayados molestos y con estados `hover/focus` claros.  
- Feedback inmediato en formularios y consola.  
- Animaciones sutiles en textos secundarios para guiar la atención.  

### 🧹 Código Limpio
- Nombres de clases y variables **descriptivos**.  
- Comentarios claros para explicar secciones clave.  
- Archivos organizados en carpetas (`css`, `js`).  
- No se mezclan estilos ni scripts en los HTML.  

---

## 🚀 Cómo usar

1. Clona o descarga el repositorio.  
2. Abre `index.html` en un navegador moderno.  
3. Regístrate o inicia sesión.  
4. Explora cursos, practica en la consola y gana XP 🎉  

---

## 📈 Posibles mejoras futuras

- Integrar un **backend real** (Node.js, Firebase o similar).  
- Autenticación segura con JWT.  
- Roles de usuario (estudiante/profesor).  
- Editor de código más avanzado (ejemplo: CodeMirror o Monaco).  
- Más cursos y soporte para otros lenguajes.  

---

## 👨‍💻 Autor

**Juan Daniel Gómez Correa**  
Estudiante del **SENA – Programación de Software**  

📌 Proyecto académico enfocado en:  
- Aplicación de **buenas prácticas de frontend**.  
- Creación de una interfaz accesible y moderna.  
- Código limpio, modular y documentado.  

---
