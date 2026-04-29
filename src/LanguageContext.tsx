import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

type Language = 'es' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const defaultTranslations: Translations = {
  es: {
    navHome: "Inicio",
    navServices: "Servicios",
    navAbout: "Nosotros",
    navContact: "Contacto",
    heroTitle1: "Innovación en Desarrollo de Software",
    heroDesc1: "Transformamos tus ideas en soluciones tecnológicas escalables y eficientes.",
    heroBtn: "Comienza tu proyecto",
    heroTitle2: "Soluciones en la Nube",
    heroDesc2: "Arquitecturas robustas para conectar tu negocio con el futuro.",
    heroTitle3: "Diseño de Experiencias UI/UX",
    heroDesc3: "Interfaces intuitivas que enamoran a tus usuarios desde el primer click.",
    partnersTitle: "Tecnologías y Stack",
    partnersMainTitle: "Potenciamos tu proyecto con las mejores herramientas",
    partnersDesc: "Utilizamos las tecnologías más modernas y robustas del mercado para garantizar que tu producto sea escalable, rápido y seguro.",
    servicesMainTitle: "Ponemos a tu disposición nuestros servicios para hacer crecer tu negocio",
    servicesSub: "Más que ofrecerte un servicio, queremos establecer relaciones comerciales y que nos veas como un aliado para el crecimiento de tu empresa.",
    srvInvoiceTitle: "Facturación electrónica",
    srvInvoiceDesc: "Te ofrecemos un sistema de facturación electrónica. (Costa Rica)",
    srvInvoiceDetail: "<h4>La solución completa para tu facturación</h4><p>Simplifica tus procesos administrativos con nuestro sistema de facturación electrónica certificado para Costa Rica. Olvídate del papel y cumple con todas las normativas del Ministerio de Hacienda de forma automática, rápida y segura.</p><h4>¿Qué incluye?</h4><ul><li>Generación ilimitada de facturas, notas de crédito y débito.</li><li>Recepción y validación de comprobantes electrónicos.</li><li>Catálogo de productos y servicios (CABYS).</li><li>Reportes automatizados y exportación a Excel.</li><li>Soporte técnico especializado.</li></ul>",
    srvDataTitle: "Análisis de datos",
    srvDataDesc: "Te ayudamos a analizar tus datos y generar dashboards.",
    srvDataDetail: "<h4>¡Bienvenido a nuestro servicio de análisis y visualización de datos personalizado!</h4><p>Estamos comprometidos a ofrecer soluciones adaptadas a tus necesidades específicas de análisis y visualización de datos.</p><p>Sabemos que cada empresa tiene sus propias necesidades y desafíos en cuanto al manejo de sus datos. Por eso, trabajamos junto a ti para entender tus requerimientos y desarrollar una solución que cumpla con ellos.</p><h4>Nuestro proceso incluye:</h4><ul><li><strong>Análisis de requisitos:</strong> En este primer paso, trabajaremos contigo para entender tus requerimientos y determinar cómo podemos ayudarte.</li><li><strong>Recopilación y limpieza de datos:</strong> Recopilaremos y limpiaremos tus datos para asegurarnos de que estén listos.</li><li><strong>Análisis y visualización:</strong> Realizaremos el análisis y la visualización mediante dashboards interactivos.</li><li><strong>Presentación de resultados:</strong> Te presentaremos los resultados de manera clara y concisa.</li></ul>",
    srvWebTitle: "Desarrollo web",
    srvWebDesc: "Te desarrollamos el sitio web que tu negocio necesita.",
    srvWebDetail: "<h4>¿Por qué es importante tener un sitio web para tu empresa?</h4><p>En un mundo cada vez más digital, tener un sitio web es esencial para cualquier empresa que quiera tener éxito. Un sitio web te permite llegar a un público más amplio y proporciona una plataforma para mostrar tus productos o servicios.</p><h4>¿Cómo se debe desarrollar un buen sitio web?</h4><ul><li><strong>Diseño de un plan de sitio:</strong> Estructura y organización general.</li><li><strong>Diseño UI/UX:</strong> Apariencia y paleta de colores.</li><li><strong>Desarrollo del contenido:</strong> Textos, imágenes y videos.</li><li><strong>Desarrollo técnico:</strong> Codificación del sitio web.</li><li><strong>Pruebas y depuración:</strong> Asegurar el correcto funcionamiento.</li><li><strong>Lanzamiento:</strong> Publicación y mantenimiento.</li></ul><p>En TecnoBrunca te ofrecemos soluciones desde la creación de un sitio web completamente personalizado hasta la renovación de un sitio web existente.</p>",
    srvSoftwareTitle: "Software a la medida",
    srvSoftwareDesc: "Cuéntanos tu proyecto y te desarrollamos el software ideal.",
    srvSoftwareDetail: "<h4>¡Bienvenido a nuestro servicio de desarrollo de software a la medida!</h4><p>Estamos orgullosos de ofrecer soluciones personalizadas a tus requerimientos de software. Sabemos que cada negocio es único y tiene sus propias necesidades y desafíos.</p><h4>Nuestro proceso de desarrollo de software incluye:</h4><ul><li><strong>Análisis de requisitos:</strong> Entender tus requerimientos y determinar cómo alcanzar tus objetivos.</li><li><strong>Diseño de la solución:</strong> Diseñaremos la estructura, arquitectura y experiencia de usuario.</li><li><strong>Desarrollo y pruebas:</strong> Codificación ágil con pruebas exhaustivas para asegurar que esté libre de errores.</li><li><strong>Implementación y soporte:</strong> Implementaremos el software en tu entorno y te ofreceremos soporte continuo.</li></ul><p>Si estás interesado en llevar tu negocio al siguiente nivel, no dudes en ponerte en contacto con nosotros.</p>",
    readMore: "Leer más",
    closeBtn: "Cerrar",
    aboutTitle: "Sobre TecnoBrunca",
    aboutP1: "Somos un equipo apasionado por la tecnología, dedicado a construir soluciones de software de clase mundial. Nos enfocamos en la calidad, el diseño y la innovación.",
    aboutP2: "Con base en la excelencia, ayudamos a empresas a alcanzar su máximo potencial digital.",
    statProjects: "Proyectos",
    statClients: "Clientes Felices",
    contactTitle: "Hablemos de tu proyecto",
    contactSub: "¿Listo para llevar tu idea al siguiente nivel? Contáctanos y te responderemos a la brevedad.",
    formName: "Nombre Completo",
    formNamePlaceholder: "Ej: John Doe",
    formEmail: "Correo Electrónico",
    formEmailPlaceholder: "john@example.com",
    formMessage: "Mensaje",
    formMessagePlaceholder: "Cuéntanos sobre tu proyecto...",
    formSubmit: "Enviar Mensaje",
    formSending: "Enviando...",
    formSuccessMsg: "¡Mensaje enviado con éxito! Te contactaremos pronto.",
    footerDesc: "Desarrollo de software de vanguardia.",
    footerRights: "Todos los derechos reservados.",
    missionTitle: "Nuestra Misión",
    missionDesc: "Impulsar la transformación digital de empresas mediante soluciones de software innovadoras, escalables y centradas en el usuario."
  },
  en: {
    navHome: "Home",
    navServices: "Services",
    navAbout: "About Us",
    navContact: "Contact",
    heroTitle1: "Innovation in Software Development",
    heroDesc1: "We transform your ideas into scalable and efficient technological solutions.",
    heroBtn: "Start your project",
    heroTitle2: "Solutions in the Cloud",
    heroDesc2: "Robust architectures to connect your business with the future.",
    heroTitle3: "UI/UX Experience Design",
    heroDesc3: "Intuitive interfaces that make your users fall in love from the first click.",
    partnersTitle: "Technologies & Stack",
    partnersMainTitle: "We power your project with the best tools",
    partnersDesc: "We use the most modern and robust technologies on the market to ensure your product is scalable, fast, and secure.",
    servicesMainTitle: "We put our services at your disposal to grow your business",
    servicesSub: "More than offering you a service, we want to establish commercial relationships and have you see us as an ally for your company's growth.",
    srvInvoiceTitle: "Electronic Invoicing",
    srvInvoiceDesc: "We offer you an electronic invoicing system. (Costa Rica)",
    srvInvoiceDetail: "<h4>The complete solution for your billing</h4><p>Simplify your administrative processes with our electronic invoicing system certified for Costa Rica. Forget about paper and automatically, quickly and safely comply with all Ministry of Finance regulations.</p><h4>What does it include?</h4><ul><li>Unlimited generation of invoices, credit and debit notes.</li><li>Reception and validation of electronic vouchers.</li><li>Catalog of products and services (CABYS).</li><li>Automated reports and export to Excel.</li><li>Specialized technical support.</li></ul>",
    srvDataTitle: "Data Analysis",
    srvDataDesc: "We help you analyze your data and generate dashboards.",
    srvDataDetail: "<h4>Welcome to our customized data analysis and visualization service!</h4><p>We are committed to offering solutions tailored to your specific data analysis needs.</p><p>We know that each company has its own needs and challenges. That is why we work with you to understand your requirements and develop a solution that meets them.</p><h4>Our process includes:</h4><ul><li><strong>Requirements analysis:</strong> We work with you to understand your needs.</li><li><strong>Data collection and cleaning:</strong> We will collect and clean your data so it is ready.</li><li><strong>Analysis and visualization:</strong> We perform the analysis and build interactive dashboards.</li><li><strong>Presentation of results:</strong> We will present the findings clearly and concisely.</li></ul>",
    srvWebTitle: "Web Development",
    srvWebDesc: "We develop the website your business needs.",
    srvWebDetail: "<h4>Why is it important to have a website for your company?</h4><p>In an increasingly digital world, having a website is essential for any company that wants to succeed. A website allows you to reach a wider audience and provides a platform to showcase your products or services.</p><h4>How should a good website be developed?</h4><ul><li><strong>Site plan design:</strong> Structure and overall organization.</li><li><strong>UI/UX Design:</strong> Appearance and color palette.</li><li><strong>Content development:</strong> Texts, images, and videos.</li><li><strong>Technical development:</strong> Site coding.</li><li><strong>Testing and debugging:</strong> Ensuring proper operation.</li><li><strong>Launch:</strong> Publication and maintenance.</li></ul><p>At TecnoBrunca we offer solutions from the creation of a completely customized website to the renovation of an existing one.</p>",
    srvSoftwareTitle: "Custom Software",
    srvSoftwareDesc: "Tell us about your project and we will develop the ideal software.",
    srvSoftwareDetail: "<h4>Welcome to our custom software development service!</h4><p>We are proud to offer customized solutions for your software requirements. We know that each business is unique and has its own needs and challenges.</p><h4>Our software development process includes:</h4><ul><li><strong>Requirements analysis:</strong> Understanding your needs to achieve your goals.</li><li><strong>Solution design:</strong> We will design the structure, architecture, and user experience.</li><li><strong>Development and testing:</strong> Agile coding with exhaustive testing to ensure it is error-free.</li><li><strong>Implementation and support:</strong> We will deploy the software in your environment and offer ongoing support.</li></ul><p>If you are interested in taking your business to the next level, do not hesitate to contact us.</p>",
    readMore: "Read more",
    closeBtn: "Close",
    aboutTitle: "About TecnoBrunca",
    aboutP1: "We are a team passionate about technology, dedicated to building world-class software solutions. We focus on quality, design, and innovation.",
    aboutP2: "Based on excellence, we help companies reach their maximum digital potential.",
    statProjects: "Projects",
    statClients: "Happy Clients",
    contactTitle: "Let's talk about your project",
    contactSub: "Ready to take your idea to the next level? Contact us and we will respond shortly.",
    formName: "Full Name",
    formNamePlaceholder: "e.g. John Doe",
    formEmail: "Email Address",
    formEmailPlaceholder: "john@example.com",
    formMessage: "Message",
    formMessagePlaceholder: "Tell us about your project...",
    formSubmit: "Send Message",
    formSending: "Sending...",
    formSuccessMsg: "Message sent successfully! We will contact you soon.",
    footerDesc: "Cutting-edge software development.",
    footerRights: "All rights reserved.",
    missionTitle: "Our Mission",
    missionDesc: "To drive the digital transformation of companies through innovative, scalable, and user-centric software solutions."
  }
};

type LanguageContextType = {
  lang: Language;
  t: (key: string) => string;
  toggleLang: () => void;
  isLoadingTranslations: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('es');
  const [translations, setTranslations] = useState<Translations>(defaultTranslations);
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && (saved === 'es' || saved === 'en')) {
      setLang(saved);
    }
    
    // Fetch translations from Supabase
    const loadTranslations = async () => {
      try {
        const { data, error } = await supabase.from('translations').select('*');
        if (error) {
          console.error('Error loading translations:', error);
          setIsLoadingTranslations(false);
          return;
        }

        if (data && data.length > 0) {
          const newTranslations: Translations = { es: {}, en: {} };
          
          // Primero copiamos los default
          newTranslations.es = { ...defaultTranslations.es };
          newTranslations.en = { ...defaultTranslations.en };
          
          // Luego sobrescribimos con lo que viene de la BD
          data.forEach(item => {
            if (item.key) {
              newTranslations.es[item.key] = item.value_es || defaultTranslations.es[item.key];
              newTranslations.en[item.key] = item.value_en || defaultTranslations.en[item.key];
            }
          });
          
          setTranslations(newTranslations);
        }
      } catch (err) {
        console.error('Failed to fetch translations:', err);
      } finally {
        setIsLoadingTranslations(false);
      }
    };

    loadTranslations();
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: string) => {
    return translations[lang][key] || defaultTranslations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isLoadingTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
