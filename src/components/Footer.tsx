import { useLanguage } from '../LanguageContext';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TextRoll } from './ui/text-roll';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-bg-light-sec dark:bg-bg-dark-sec border-t border-border-light dark:border-border-dark pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="text-center md:text-left">
            <img src="/assets/images/navbar-logo.png" alt="TecnoBrunca Logo" className="h-10 mx-auto md:mx-0 mb-4 object-contain drop-shadow-sm dark:brightness-150 transition-all" />
            <p className="text-text-light-sec dark:text-text-dark-sec text-lg font-medium">
              <TextRoll>{t('footerDesc')}</TextRoll>
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="w-12 h-12 rounded-full bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark flex items-center justify-center text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary hover:border-primary transition-all duration-300" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark flex items-center justify-center text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary hover:border-primary transition-all duration-300" aria-label="X (Twitter)">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark flex items-center justify-center text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary hover:border-primary transition-all duration-300" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-border-light dark:border-border-dark text-text-light-sec dark:text-text-dark-sec text-sm">
          <p>&copy; {new Date().getFullYear()} TecnoBrunca. {t('footerRights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
