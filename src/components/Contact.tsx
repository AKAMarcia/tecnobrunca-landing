import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { DynamicText } from './DynamicText';

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Honeypot state to prevent bots
  const [website, setWebsite] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Check honeypot
    if (website !== "") {
      console.warn("Bot detected via honeypot");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    // Validation
    if (!name || name.trim().length < 2) {
      setError("Por favor, ingrese un nombre válido.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    if (!message || message.trim().length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      setWebsite("");

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 overflow-hidden bg-bg-light dark:bg-bg-dark border-t border-border-light dark:border-border-dark">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-7x3 flex-col justify-between gap-16 lg:flex-row lg:gap-20">

          <motion.div
            className="mx-auto flex max-w-sm flex-col justify-center gap-10 lg:mx-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center lg:text-left">
              <h2 className="mb-4 text-4xl font-extrabold lg:text-5xl tracking-tight text-text-light dark:text-text-dark">
                <DynamicText translationKey="contactTitle" />
              </h2>
              <p className="text-lg text-text-light-sec dark:text-text-dark-sec">
                <DynamicText translationKey="contactSub" />
              </p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-xl font-bold lg:text-left text-text-light dark:text-text-dark uppercase tracking-wide">
                Detalles de Contacto
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-lg font-medium text-text-light-sec dark:text-text-dark-sec">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  +506 8410-2773
                </li>
                <li className="flex items-center gap-4 text-lg font-medium text-text-light-sec dark:text-text-dark-sec">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <a href={`mailto:info@tecnobrunca.com`} className="hover:text-primary transition-colors">
                    info@tecnobrunca.com
                  </a>
                </li>
                <li className="flex items-center gap-4 text-lg font-medium text-text-light-sec dark:text-text-dark-sec">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  Costa Rica
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto flex w-full max-w-screen-md flex-col gap-6 rounded-[2rem] bg-bg-light-sec dark:bg-bg-dark-sec border border-border-light dark:border-border-dark p-8 md:p-12 shadow-sm"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot Field (Antispam) */}
              <div className="hidden">
                <label>Do not fill this if you are human</label>
                <input 
                  type="text" 
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)} 
                  autoComplete="off" 
                />
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="name" className="text-base">
                  <DynamicText translationKey="formName" />
                </Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name"
                  required 
                  maxLength={100}
                  placeholder={t('formNamePlaceholder')} 
                  className="h-14 px-5 rounded-xl text-base" 
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="email" className="text-base">
                  <DynamicText translationKey="formEmail" />
                </Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email"
                  required 
                  maxLength={150}
                  placeholder={t('formEmailPlaceholder')} 
                  className="h-14 px-5 rounded-xl text-base" 
                />
              </div>
              <div className="grid w-full gap-2">
                <Label htmlFor="message" className="text-base">
                  <DynamicText translationKey="formMessage" />
                </Label>
                <Textarea 
                  id="message" 
                  name="message"
                  required 
                  maxLength={2000}
                  placeholder={t('formMessagePlaceholder')} 
                  className="min-h-[160px] p-5 rounded-xl text-base resize-none" 
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm font-medium px-2">
                  ⚠️ {error}
                </div>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full h-14 mt-4 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 text-white border-none shadow-md shadow-primary/20">
                {isSubmitting && <Loader2 size={22} className="mr-2 animate-spin" />}
                {isSubmitting ? t('formSending') : t('formSubmit')}
              </Button>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary/10 text-primary rounded-xl border border-primary/20 text-center font-bold shadow-sm"
                >
                  <DynamicText translationKey="formSuccessMsg" />
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
