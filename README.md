# 🚀 CodiGo – Frontend UI  

![Estado](https://img.shields.io/badge/Estado-Producción-brightgreen?style=for-the-badge)  
![Responsive](https://img.shields.io/badge/Responsive-Móvil%20%7C%20Tablet%20%7C%20Desktop-39ff14?style=for-the-badge)  
![UI](https://img.shields.io/badge/UI-Hacker%20Neon-00fff7?style=for-the-badge)  

---

## 📑 Tabla de contenidos
1. [📌 Resumen del proyecto](#-resumen-del-proyecto)  
2. [📂 Estructura de carpetas](#-estructura-de-carpetas)  
3. [🎨 Guía de estilos (Design System)](#-guía-de-estilos-design-system)  
   - [🎨 Teoría aplicada](#-teoría-aplicada)  
   - [🧠 Psicología del color](#-psicología-del-color)  
   - [✅ Contraste WCAG](#-contraste-wcag)  
   - [✍️ Tipografía](#-tipografía)  
   - [📐 Espaciado y radios](#-espaciado-y-radios)  
   - [🧩 Componentes base](#-componentes-base)  
4. [♿ Accesibilidad](#-accesibilidad)  
5. [📱 Responsive Design](#-responsive-design)  
6. [⚡ Rendimiento](#-rendimiento)  
7. [✔ Buenas prácticas](#-buenas-prácticas)  
8. [🔍 SEO y Metadatos](#-seo-y-metadatos)  
9. [🔐 Seguridad](#-seguridad)  
10. [✅ QA Checklist](#-qa-checklist)  
11. [🌱 Cómo extender el diseño](#-cómo-extender-el-diseño)  
12. [📌 Snippets útiles](#-snippets-útiles)  
13. [🧾 Notas finales](#-notas-finales)  

---

## 📌 Resumen del proyecto
**CodiGo** es una interfaz **oscura con acentos neón**, diseñada para un entorno **moderno y tecnológico**, priorizando:  

✔ **Claridad visual** con fondo oscuro.  
✔ **Jerarquía** mediante tarjetas con efecto glass.  
✔ **Acentos llamativos** en cian y verde para guiar la atención.  

**Páginas principales:**
- `login.html` → Inicio de sesión.  
- `pages/register.html` → Registro.  
- `pages/dashboard.html` → Panel de cursos.  
- `pages/curso.html` → Contenido + editor + consola.  

---

## 📂 Estructura de carpetas
```bash
tu-ruta/
├─ login.html
├─ pages/
│  ├─ register.html
│  ├─ dashboard.html
│  └─ curso.html
└─ assets/
   ├─ css/
   │  ├─ login.css
   │  ├─ register.css
   │  ├─ dashboard.css
   │  └─ curso.css
   └─ js/
      ├─ login.js
      ├─ register.js
      ├─ dashboard.js
      └─ curso.js

🎨 Guía de estilos (Design System)
🎨 Teoría aplicada

Fondo oscuro (casi negro): alto contraste, menos fatiga visual.

Cian (#00fff7) + Verde (#39ff14): colores análogos, transmiten flujo, modernidad y tecnología.

Toques magenta en brillos: contraste triádico para dinamismo sin romper la paleta.

🧠 Psicología del color

Cian: claridad, enfoque.

Verde: progreso, motivación.

Oscuros fríos: seriedad y foco.

✅ Contraste WCAG

Texto base cumple AAA sobre paneles oscuros.

Neones usados solo en acentos.

✍️ Tipografía

Fuente: Consolas, monospace (evoca código).

Jerarquía: títulos con gradiente + peso 900.

Line-height: 1.4–1.6.

Tamaños fluidos: clamp() en headings.

📐 Espaciado y radios

Escala de múltiplos de 4px (8, 12, 16, 24, 32…).

Radios:

Botones/inputs: 12px

Tarjetas: 12–20px

🧩 Componentes base

Botones: hover con glow, active con compresión.

Inputs: translúcidos, foco con sombra cian/verde.

Cards: efecto glass con borde tenue.

Badges: semántica clara (éxito = verde).

♿ Accesibilidad

Contraste AA/AAA.

Foco visible en todos los interactivos.

Navegación completa con teclado.

Animaciones respetan reduce motion.

📱 Responsive Design

Estrategia mobile-first con flex y grid.

Breakpoint	Dispositivo
≥ 1200px	Desktop grande
900–1199px	Tablet landscape
600–899px	Tablet portrait
≤ 599px	Móviles

✔ Dashboard: grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
✔ Curso: 2 columnas → 1 en ≤ 900px
✔ Login/Register: .box centrado y fluido

⚡ Rendimiento

Animar solo transform y opacity.

Sombras y blur moderados.

CSS minificado en producción.

Uso de fuentes del sistema.

✔ Buenas prácticas

HTML: semántico, lang="es", alt y aria-label.
CSS: variables en :root, unidades relativas, sin !important.
JS: sin estilos inline, validación en cliente y servidor.

🔍 SEO y Metadatos

<title> y <meta name="description"> únicos por página.

viewport correcto.

URLs semánticas.

🔐 Seguridad

iframe con sandbox.

CSP recomendada:

Content-Security-Policy: default-src 'self';

✅ QA Checklist

 Hover y focus visibles

 Contraste AA cumplido

 Sin scroll horizontal en mobile

 Navegación por teclado funcional

🌱 Cómo extender el diseño

Añadir componentes usando --neon1, --neon2.

Variantes: hover, active, disabled.

Soporte a modo claro vía [data-theme="light"].

📌 Snippets útiles

🔹 Título con gradiente neón:

h1 {
  background: var(--grad);
  -webkit-background-clip: text;
  color: transparent;
}


🔹 Glow en botones:

button:hover {
  box-shadow: 0 0 12px var(--neon1);
}

🧾 Notas finales

Este diseño sigue principios de:

✔ Consistencia visual
✔ Usabilidad
✔ Accesibilidad

Con estética inspirada en interfaces tech modernas (neón sobre dark UI).