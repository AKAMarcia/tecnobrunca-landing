# TecnoBrunca - Modern Landing Page

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC)

Una landing page moderna, dinámica y de alto rendimiento diseñada para **TecnoBrunca**. Este proyecto fue desarrollado con un enfoque en la estética premium, interactividad 3D y seguridad de datos.

---

## 🚀 Características Principales

- **Experiencia 3D Inmersiva**: Integración de escenas interactivas con Spline en la sección Hero.
- **Diseño Ultra-Moderno**: Estética basada en modo oscuro/claro con una paleta de colores curada (Naranja Corporativo / Negro Profundo).
- **Stack Tecnológico Dinámico**: Carruseles de tecnologías con scroll infinito y animaciones de entrada.
- **Seguridad Auditada**:
  - Sanitización de contenido HTML con **DOMPurify** para prevenir ataques XSS.
  - Formulario de contacto con validación estricta y protección **Antispam (Honeypot)**.
- **Totalmente Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio.
- **Internacionalización**: Soporte multi-idioma (Español/Inglés) mediante Context API.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **3D**: [Spline Runtime](https://spline.design/)
- **Seguridad**: [DOMPurify](https://github.com/cure53/dompurify)
- **Herramientas**: [Vite](https://vitejs.dev/), [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)

---

## 📦 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/tecnobrunca-landing.git
   cd tecnobrunca-landing
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construir para producción**:
   ```bash
   npm run build
   ```

---

## 🔒 Notas de Seguridad

Este proyecto ha sido auditado para prevenir vulnerabilidades comunes. Se han implementado filtros de limpieza para el renderizado de HTML dinámico y se ha blindado el formulario de contacto contra bots automáticos sin afectar la experiencia del usuario.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ por [AKAMarcia](https://github.com/AKAMarcia)
