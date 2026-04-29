import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';

type ServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  titleKey: string;
  detailKey: string;
};

const ServiceModal = ({ isOpen, onClose, titleKey, detailKey }: ServiceModalProps) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sanitizedHTML = DOMPurify.sanitize(t(detailKey));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl max-h-[85vh] overflow-y-auto bg-bg-light dark:bg-bg-dark rounded-3xl shadow-2xl z-[101] border border-border-light dark:border-border-dark p-6 md:p-10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-bg-light-sec dark:bg-bg-dark-sec hover:bg-border-light dark:hover:bg-border-dark transition-colors"
              aria-label={t('closeBtn')}
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-primary pr-12">
              {t(titleKey)}
            </h2>

            <div 
              className="prose dark:prose-invert prose-lg max-w-none 
                         prose-headings:font-bold prose-headings:text-text-light dark:prose-headings:text-text-dark
                         prose-a:text-primary prose-li:marker:text-primary"
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
