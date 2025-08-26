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

tu-ruta/
├─ login.html
├─ pages/
│ ├─ register.html
│ ├─ dashboard.html
│ └─ curso.html
└─ assets/
├─ css/
│ ├─ login.css
│ ├─ register.css
│ ├─ dashboard.css
│ └─ curso.css
└─ js/
├─ login.js
├─ register.js
├─ dashboard.js
└─ curso.js


---

## 🎨 Guía de estilos (Design System)

### 🎨 **Teoría aplicada**
- **Fondo oscuro (casi negro):** alto contraste, menos fatiga visual.
- **Cian (#00fff7) + Verde (#39ff14):** colores **análogos**, transmiten **flujo, modernidad y tecnología**.
- **Toques magenta en brillos:** contraste triádico para dinamismo sin romper la paleta.

---

### 🧠 **Psicología del color**
- **Cian:** claridad, enfoque.
- **Verde:** progreso, motivación.
- **Oscuros fríos:** seriedad y foco.

---

### ✅ **Contraste WCAG**
- `--text` sobre `--panel` ≈ **AAA**.
- Neones solo para **acentos y acciones**; texto base en `--text`.

---

### ✍️ **Tipografía**
- **Fuente:** `Consolas, monospace` (evoca código).
- **Jerarquía:** títulos con gradiente + peso **900**.
- **Line-height:** 1.4–1.6.
- **Tamaños fluidos:** usar `clamp()` en headings.

---

### 📐 **Espaciado y radios**
- **Escala:** múltiplos de 4px (8, 12, 16, 24, 32…).
- **Radios:**
  - **Botones/inputs:** 12px
  - **Tarjetas:** 12–20px

---

### 🧩 **Componentes base**
- **Botones:** hover con leve elevación y glow; `:active` con compresión.
- **Inputs:** fondo translúcido; `:focus` con sombra **cian/verde**.
- **Cards:** efecto glass, borde tenue y glow moderado.
- **Badges:** alto contraste, semántica clara (**éxito = verde**).

---

## ♿ **Accesibilidad**
- Contraste **AA/AAA** en textos críticos.
- Foco visible (`:focus` / `:focus-visible`) en todos los interactivos.
- Navegación completa con **Tab / Shift+Tab**.
- Animaciones respetan **reduce motion**.

---

## 📱 **Responsive Design**
**Estrategia:** mobile-first con **flex** y **grid**.

| Breakpoint      | Dispositivo       |
|-----------------|-------------------|
| `≥ 1200px`      | Desktop grande   |
| `900–1199px`    | Tablet landscape |
| `600–899px`     | Tablet portrait  |
| `≤ 599px`       | Móviles          |

✔ **Dashboard** → `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`  
✔ **Curso** → de **2 columnas** a **1 columna** en ≤ **900px**  
✔ **Login/Register** → `.box` centrado y ancho fluido en móviles  

---

## ⚡ **Rendimiento**
- Animar **solo** `transform` y `opacity`.
- Sombras y blur con moderación (impacto en GPU).
- CSS minificado en producción.
- Fuentes del sistema (`monospace`).

---

## ✔ **Buenas prácticas**

### HTML
- Semántica: `header`, `main`, `section`, `nav`, `form`.
- `lang="es"`, `alt` en imágenes, `aria-label` donde aplique.

### CSS
- Variables en `:root`.
- Unidades relativas (`rem`, `%`).
- Evitar `!important`.

### JS
- Evitar estilos inline.
- Validación cliente/servidor.

---

## 🔍 **SEO y Metadatos**
- `<title>` y `<meta name="description">` únicos por página.
- `viewport` correcto.
- URLs semánticas.

---

## 🔐 **Seguridad**
- `iframe` con `sandbox`.
- CSP recomendada:
```http
Content-Security-Policy: default-src 'self';


## ✅ QA Checklist
- [ ] Hover y focus visibles.
- [ ] Contraste AA cumplido.
- [ ] Sin scroll horizontal en mobile.
- [ ] Navegación por teclado funcional.

---

## 🌱 Cómo extender el diseño
- Añadir componentes usando `--neon1`, `--neon2`.
- Definir variantes: **hover**, **active**, **disabled**.
- Soporte a **modo claro** vía `[data-theme="light"]`.

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