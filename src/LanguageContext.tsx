import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

type Language = 'es' | 'en';

export type TranslationData = {
  value: string;
  effect: string;
};

type Translations = {
  [key in Language]: {
    [key: string]: TranslationData;
  };
};

const defaultTranslations: any = {
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
    hero_rotating_titles: "Desarrollo de Software|Soluciones Cloud|Diseño UI/UX|Aplicaciones Móviles|Innovación Digital",
    partnersTitle: "Tecnologías y Stack",
    partnersMainTitle: "Potenciamos tu proyecto con las mejores herramientas",
    partnersDesc: "Utilizamos las tecnologías más modernas y robustas del mercado para garantizar que tu producto sea escalable, rápido y seguro.",
    servicesMainTitle: "Ponemos a tu disposición nuestros servicios para hacer crecer tu negocio",
    servicesSub: "Más que ofrecerte un servicio, queremos establecer relaciones comerciales y que nos veas como un aliado para el crecimiento de tu empresa.",
    srvInvoiceTitle: "Facturación electrónica",
    srvInvoiceDesc: "Te ofrecemos un sistema de facturación electrónica. (Costa Rica)",
    srvInvoiceDetail: "<h4>La solución completa para tu facturación</h4><p>Simplifica tus procesos administrativos con nuestro sistema de facturación electrónica certificado para Costa Rica. Olvídate del papel y cumple con todas las normativas del Ministerio de Hacienda de forma automática, rápida y segura.</p>",
    srvDataTitle: "Análisis de datos",
    srvDataDesc: "Te ayudamos a analizar tus datos y generar dashboards.",
    srvDataDetail: "<h4>Análisis personalizado</h4><p>Estamos comprometidos a ofrecer soluciones adaptadas a tus necesidades específicas de análisis y visualización de datos.</p>",
    srvWebTitle: "Desarrollo web",
    srvWebDesc: "Te desarrollamos el sitio web que tu negocio necesita.",
    srvWebDetail: "<h4>Sitios web profesionales</h4><p>En un mundo cada vez más digital, tener un sitio web es esencial para cualquier empresa que quiera tener éxito.</p>",
    srvSoftwareTitle: "Software a la medida",
    srvSoftwareDesc: "Cuéntanos tu proyecto y te desarrollamos el software ideal.",
    srvSoftwareDetail: "<h4>Desarrollo personalizado</h4><p>Estamos orgullosos de ofrecer soluciones personalizadas a tus requerimientos de software.</p>",
    readMore: "Leer más",
    closeBtn: "Cerrar",
    aboutTitle: "Sobre TecnoBrunca",
    aboutP1: "Somos un equipo apasionado por la tecnología, dedicado a construir soluciones de software de clase mundial.",
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
    missionDesc: "Impulsar la transformación digital mediante software innovador."
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
    hero_rotating_titles: "Software Development|Cloud Solutions|UI/UX Design|Mobile Applications|Digital Innovation",
    partnersTitle: "Technologies & Stack",
    partnersMainTitle: "We power your project with the best tools",
    partnersDesc: "We use the most modern and robust technologies on the market.",
    servicesMainTitle: "We put our services at your disposal to grow your business",
    servicesSub: "More than offering you a service, we want to establish commercial relationships.",
    srvInvoiceTitle: "Electronic Invoicing",
    srvInvoiceDesc: "We offer you an electronic invoicing system. (Costa Rica)",
    srvInvoiceDetail: "<h4>Complete solution</h4><p>Simplify your administrative processes with our electronic invoicing system.</p>",
    srvDataTitle: "Data Analysis",
    srvDataDesc: "We help you analyze your data and generate dashboards.",
    srvDataDetail: "<h4>Customized analysis</h4><p>We are committed to offering solutions tailored to your specific needs.</p>",
    srvWebTitle: "Web Development",
    srvWebDesc: "We develop the website your business needs.",
    srvWebDetail: "<h4>Professional websites</h4><p>In an increasingly digital world, having a website is essential.</p>",
    srvSoftwareTitle: "Custom Software",
    srvSoftwareDesc: "Tell us about your project and we will develop the ideal software.",
    srvSoftwareDetail: "<h4>Customized solutions</h4><p>We are proud to offer customized solutions for your requirements.</p>",
    readMore: "Read more",
    closeBtn: "Close",
    aboutTitle: "About TecnoBrunca",
    aboutP1: "We are a team passionate about technology, dedicated to building world-class software.",
    aboutP2: "Based on excellence, we help companies reach their maximum potential.",
    statProjects: "Projects",
    statClients: "Happy Clients",
    contactTitle: "Let's talk about your project",
    contactSub: "Ready to take your idea to the next level? Contact us.",
    formName: "Full Name",
    formNamePlaceholder: "e.g. John Doe",
    formEmail: "Email Address",
    formEmailPlaceholder: "john@example.com",
    formMessage: "Message",
    formMessagePlaceholder: "Tell us about your project...",
    formSubmit: "Send Message",
    formSending: "Sending...",
    formSuccessMsg: "Message sent successfully!",
    footerDesc: "Cutting-edge software development.",
    footerRights: "All rights reserved.",
    missionTitle: "Our Mission",
    missionDesc: "To drive digital transformation through innovative software."
  }
};

const transformDefaults = (): Translations => {
  const result: any = { es: {}, en: {} };
  Object.keys(defaultTranslations.es).forEach(key => {
    result.es[key] = { value: defaultTranslations.es[key], effect: 'none' };
    result.en[key] = { value: defaultTranslations.en[key], effect: 'none' };
  });
  return result;
};

type LanguageContextType = {
  lang: Language;
  t: (key: string) => string;
  getMetadata: (key: string) => TranslationData;
  getComponentKeys: (componentName: string) => string[];
  toggleLang: () => void;
  isLoadingTranslations: boolean;
  translations: Translations; // Exponer para filtrado avanzado si es necesario
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>('es');
  const [translations, setTranslations] = useState<Translations>(transformDefaults());
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);
  const [rawMetadata, setRawMetadata] = useState<any[]>([]); // Para guardar los componentes

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && (saved === 'es' || saved === 'en')) {
      setLang(saved);
    }
    
    const loadTranslations = async () => {
      try {
        const { data, error } = await supabase.from('translations').select('*');
        if (error) {
          console.error('Error loading translations:', error);
          setIsLoadingTranslations(false);
          return;
        }

        if (data && data.length > 0) {
          setRawMetadata(data);
          const newTranslations = transformDefaults();
          
          data.forEach(item => {
            if (item.key) {
              newTranslations.es[item.key] = { 
                value: item.value_es || (defaultTranslations.es[item.key] || ''), 
                effect: item.effect || 'none' 
              };
              newTranslations.en[item.key] = { 
                value: item.value_en || (defaultTranslations.en[item.key] || ''), 
                effect: item.effect || 'none' 
              };
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
    return translations[lang][key]?.value || key;
  };

  const getMetadata = (key: string): TranslationData => {
    return translations[lang][key] || { value: key, effect: 'none' };
  };

  const getComponentKeys = (componentName: string): string[] => {
    return rawMetadata
      .filter(item => item.component === componentName)
      .map(item => item.key)
      .sort((a, b) => a.localeCompare(b)); // Orden alfabetico por defecto
  };

  return (
    <LanguageContext.Provider value={{ lang, t, getMetadata, getComponentKeys, toggleLang, isLoadingTranslations, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
