import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { SplineScene } from "./ui/spline";
import { Spotlight } from "./ui/spotlight";
import { motion } from 'framer-motion';

const Hero = () => {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();

  const [titleNumber, setTitleNumber] = useState(0);
  
  const titlesEs = useMemo(() => ["Desarrollo de Software", "Soluciones Cloud", "Diseño UI/UX", "Aplicaciones Móviles", "Innovación Digital"], []);
  const titlesEn = useMemo(() => ["Software Development", "Cloud Solutions", "UI/UX Design", "Mobile Applications", "Digital Innovation"], []);
  const titles = lang === 'es' ? titlesEs : titlesEn;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section id="home" className="w-full h-screen min-h-[600px] bg-bg-light dark:bg-black relative overflow-hidden flex items-center pt-20 transition-colors duration-300">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={theme === 'dark' ? 'white' : '#ea580c'}
      />
      
      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row relative z-10">
        {/* Left content */}
        <div className="flex-1 relative z-10 flex flex-col justify-center pb-12 md:pb-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight flex flex-col items-start z-20"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400">
              {lang === 'es' ? "Innovación en" : "Innovation in"}
            </span>
            {/* Contenedor animado con padding extra para no cortar sombras y w-max para que no lo limite la columna */}
            <span className="relative flex w-max justify-start overflow-hidden py-4 -my-4 px-2 -mx-2">
              <span className="invisible pointer-events-none">{titles[0]}</span>
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute left-2 top-4 text-primary drop-shadow-[0_0_20px_rgba(234,88,12,0.6)] dark:drop-shadow-[0_0_25px_rgba(234,88,12,0.8)] whitespace-nowrap"
                  initial={{ opacity: 0, y: "-100%" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? "-100%" : "100%", opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-lg text-xl"
          >
            {t('heroDesc1')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10"
          >
            <a href="#contact" className="btn-primary text-lg px-8 py-4 shadow-[0_0_15px_rgba(234,88,12,0.2)] dark:shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.4)] dark:hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]">
              {t('heroBtn')}
            </a>
          </motion.div>
        </div>

        {/* Right content (3D Spline) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex-1 relative h-[50vh] md:h-full mt-8 md:mt-0"
        >
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-l from-bg-light/80 via-transparent to-transparent dark:from-black/20 md:hidden"></div>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full scale-[1.2] md:scale-100 origin-center"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
