import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { DynamicText } from './DynamicText';
import { supabase } from '../lib/supabase';

const Footer = () => {
  const { t } = useLanguage();
  const [links, setLinks] = useState({
    linkedin_url: '#',
    twitter_url: '#',
    github_url: '#'
  });

  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', ['linkedin_url', 'twitter_url', 'github_url']);
        
        if (!error && data) {
          const newLinks = { ...links };
          data.forEach(item => {
            if (item.key === 'linkedin_url' || item.key === 'twitter_url' || item.key === 'github_url') {
              newLinks[item.key as keyof typeof links] = item.value || '#';
            }
          });
          setLinks(newLinks);
        }
      } catch (err) {
        console.error('Error fetching footer links:', err);
      }
    };
    
    fetchFooterSettings();
  }, []);

  return (
    <footer className="bg-bg-light-sec dark:bg-bg-dark-sec border-t border-border-light dark:border-border-dark pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="text-center md:text-left">
            <img src="/assets/images/navbar-logo.png" alt="TecnoBrunca Logo" className="h-10 mx-auto md:mx-0 mb-4 object-contain drop-shadow-sm dark:brightness-150 transition-all" />
            <p className="text-text-light-sec dark:text-text-dark-sec text-lg font-medium">
              <DynamicText translationKey="footerDesc" />
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href={links.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark flex items-center justify-center text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary hover:border-primary transition-all duration-300" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href={links.twitter_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark flex items-center justify-center text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary hover:border-primary transition-all duration-300" aria-label="X (Twitter)">
              <FaXTwitter size={20} />
            </a>
            <a href={links.github_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark flex items-center justify-center text-text-light-sec hover:text-primary dark:text-text-dark-sec dark:hover:text-primary hover:border-primary transition-all duration-300" aria-label="GitHub">
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
