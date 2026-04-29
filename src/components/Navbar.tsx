import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import { Moon, Sun, Languages, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DynamicText } from './DynamicText';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, getComponentKeys, toggleLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Obtenemos dinámicamente las claves del componente Navbar
  const navKeys = getComponentKeys('Navbar');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para determinar el href basado en la clave (ej: navAbout -> #about)
  const getHref = (key: string) => {
    if (key === 'navHome') return '#home';
    if (key === 'navContact') return '#contact';
    const section = key.toLowerCase().replace('nav', '');
    return `#${section}`;
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-lg border-border-light dark:border-border-dark shadow-sm' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#home">
            <img src="/assets/images/navbar-logo.png" alt="TecnoBrunca Logo" className="h-8 md:h-10 object-contain drop-shadow-sm dark:brightness-150 transition-all" />
          </a>
        </div>
        
        {/* Desktop Nav Dinámico */}
        <nav className="hidden md:flex items-center gap-8">
          {navKeys.map((key) => {
            const isButton = key === 'navContact';
            return (
              <a 
                key={key}
                href={getHref(key)} 
                className={isButton 
                  ? "btn-primary py-2 px-5 text-sm" 
                  : "text-sm font-semibold text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary transition-colors"
                }
              >
                <DynamicText translationKey={key} />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLang} 
            className="p-2 rounded-full hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec transition-colors flex items-center gap-2"
            aria-label="Toggle Language"
          >
            <Languages size={20} />
            <span className="text-sm font-bold uppercase">{lang}</span>
          </button>
          
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            className="md:hidden p-2 ml-2 rounded-full hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dinámico */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark py-4 px-6 flex flex-col gap-4 shadow-xl">
          {navKeys.map((key) => (
            <a 
              key={key}
              href={getHref(key)} 
              onClick={() => setMobileMenuOpen(false)} 
              className={key === 'navContact' ? "btn-primary text-center mt-2" : "font-semibold block py-2"}
            >
              <DynamicText translationKey={key} />
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
