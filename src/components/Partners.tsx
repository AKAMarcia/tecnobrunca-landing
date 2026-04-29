import { useLanguage } from '../LanguageContext';

const ICONS_ALL = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", alt: "PHP" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", alt: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", alt: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg", alt: "Vue.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", alt: "MySQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", alt: "GitHub" },
];

const Partners = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 overflow-hidden bg-bg-light-sec dark:bg-bg-dark-sec border-y border-border-light dark:border-border-dark">
      {/* Light/Dark grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
          {t('partnersMainTitle')}
        </h2>
        <p className="mt-4 text-lg text-text-light-sec dark:text-text-dark-sec max-w-2xl mx-auto mb-16">
          {t('partnersDesc')}
        </p>

        {/* Static Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
          {ICONS_ALL.map((icon, i) => (
            <div 
              key={i} 
              className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 rounded-2xl bg-white dark:bg-slate-50 border border-border-light dark:border-transparent shadow-sm flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group"
            >
              <img 
                src={icon.src} 
                alt={icon.alt} 
                className="h-10 w-10 md:h-12 md:w-12 object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
