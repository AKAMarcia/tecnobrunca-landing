import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import { Moon, Sun, Languages, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm font-semibold text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary transition-colors">{t('navHome')}</a>
          <a href="#services" className="text-sm font-semibold text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary transition-colors">{t('navServices')}</a>
          <a href="#about" className="text-sm font-semibold text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary transition-colors">{t('navAbout')}</a>
          <a href="#contact" className="btn-primary py-2 px-5 text-sm">{t('navContact')}</a>
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark py-4 px-6 flex flex-col gap-4 shadow-xl">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="font-semibold block py-2">{t('navHome')}</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="font-semibold block py-2">{t('navServices')}</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="font-semibold block py-2">{t('navAbout')}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center mt-2">{t('navContact')}</a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
