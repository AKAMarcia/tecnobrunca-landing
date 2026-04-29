import { useLanguage } from '../LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Award, Zap } from 'lucide-react';

const StatItem = ({ value, label, icon: Icon, delay }: { value: string, label: string, icon: any, delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group p-8 rounded-3xl bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark shadow-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={80} />
      </div>
      <div className="relative z-10">
        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-extrabold text-text-light dark:text-text-dark tracking-tighter">
            {displayValue}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}
          </span>
        </div>
        <p className="text-text-light-sec dark:text-text-dark-sec font-medium mt-1">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-bg-light dark:bg-bg-dark">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >

            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight text-text-light dark:text-text-dark leading-[1.1]">
              {t('aboutTitle')}
            </h2>

            <div className="space-y-6">
              <p className="text-xl text-text-light-sec dark:text-text-dark-sec leading-relaxed">
                {t('aboutP1')}
              </p>
              <p className="text-lg text-text-light-sec dark:text-text-dark-sec leading-relaxed opacity-80">
                {t('aboutP2')}
              </p>
            </div>

          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatItem
              value="50+"
              label={t('statProjects')}
              icon={Zap}
              delay={0.1}
            />
            <StatItem
              value="99%"
              label={t('statClients')}
              icon={Users}
              delay={0.2}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-primary to-orange-600 text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Award size={160} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('missionTitle')}</h3>
              <p className="text-white/90 text-lg leading-relaxed max-w-md">
                {t('missionDesc')}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
