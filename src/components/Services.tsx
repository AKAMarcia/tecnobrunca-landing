import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { FileText, BarChart3, Code2, Settings } from 'lucide-react';
import { useState } from 'react';
import ServiceModal from './ServiceModal';

const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<{titleKey: string, detailKey: string} | null>(null);

  const servicesList = [
    {
      icon: <FileText size={32} className="text-white" />,
      titleKey: 'srvInvoiceTitle',
      descKey: 'srvInvoiceDesc',
      detailKey: 'srvInvoiceDetail'
    },
    {
      icon: <BarChart3 size={32} className="text-white" />,
      titleKey: 'srvDataTitle',
      descKey: 'srvDataDesc',
      detailKey: 'srvDataDetail'
    },
    {
      icon: <Code2 size={32} className="text-white" />,
      titleKey: 'srvWebTitle',
      descKey: 'srvWebDesc',
      detailKey: 'srvWebDetail'
    },
    {
      icon: <Settings size={32} className="text-white" />,
      titleKey: 'srvSoftwareTitle',
      descKey: 'srvSoftwareDesc',
      detailKey: 'srvSoftwareDetail'
    }
  ];

  return (
    <>
      <section id="services" className="relative py-24 overflow-hidden bg-primary/5 dark:bg-primary/10">
        {/* Wavy Background Decoration */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 text-bg-light dark:text-bg-dark">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 pt-16 relative z-10">
          
          <div className="text-center md:text-left mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">{t('servicesMainTitle')}</h2>
            <p className="text-lg text-text-light-sec dark:text-text-dark-sec">
              {t('servicesSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side: Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              {/* Abstract shape background for the illustration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-3xl opacity-20 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
              {/* Illustration placeholder - could be replaced with an actual image */}
              <img src="/assets/images/hero_carousel_1_1777428642562.png" alt="Services Illustration" className="relative rounded-[2rem] shadow-2xl object-cover h-[500px] w-full" />
            </motion.div>

            {/* Right side: Services List */}
            <div className="space-y-6">
              {servicesList.map((srv, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-bg-light dark:bg-bg-dark p-6 rounded-2xl shadow-lg border border-border-light dark:border-border-dark flex gap-6 items-start hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedService({ titleKey: srv.titleKey, detailKey: srv.detailKey })}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {srv.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t(srv.titleKey)}</h3>
                    <p className="text-text-light-sec dark:text-text-dark-sec text-sm leading-relaxed mb-3">
                      {t(srv.descKey)}
                    </p>
                    <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t('readMore')} <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </div>

        {/* Bottom Wavy Decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none text-bg-light dark:text-bg-dark translate-y-[1px]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-current"></path>
          </svg>
        </div>
      </section>

      <ServiceModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)}
        titleKey={selectedService?.titleKey || ''}
        detailKey={selectedService?.detailKey || ''}
      />
    </>
  );
};

export default Services;
