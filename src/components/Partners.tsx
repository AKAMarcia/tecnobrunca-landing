import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { DynamicText } from './DynamicText';

type Asset = {
  id: number;
  url: string;
  alt: string;
  category: string;
};

const Partners = () => {
  const [logos, setLogos] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('category', 'PartnerLogo')
        .order('display_order', { ascending: true });

      if (!error && data) {
        setLogos(data);
      }
      setLoading(false);
    };

    fetchLogos();
  }, []);

  // Para el efecto de scroll infinito, duplicamos la lista
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="relative py-24 overflow-hidden bg-bg-light-sec dark:bg-bg-dark-sec border-y border-border-light dark:border-border-dark">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
          <DynamicText translationKey="partnersMainTitle" />
        </h2>
        <p className="mt-4 text-lg text-text-light-sec dark:text-text-dark-sec max-w-2xl mx-auto mb-16">
          <DynamicText translationKey="partnersDesc" />
        </p>

        {loading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Gradientes laterales para suavizar el scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-light-sec dark:from-bg-dark-sec to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-light-sec dark:from-bg-dark-sec to-transparent z-10 pointer-events-none"></div>

            {/* Marquee Container */}
            <div className="flex overflow-hidden group">
              <motion.div 
                className="flex gap-8 py-4 px-4"
                animate={{ x: [0, -1920] }} // Ajustar según el ancho total
                transition={{ 
                  duration: 40, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatType: "loop" 
                }}
              >
                {marqueeLogos.map((logo, i) => (
                  <div 
                    key={`${logo.id}-${i}`} 
                    className="h-20 w-32 md:h-24 md:w-40 flex-shrink-0 rounded-2xl bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark shadow-sm flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-primary group/card"
                  >
                    <img 
                      src={logo.url} 
                      alt={logo.alt} 
                      className="h-10 w-auto max-w-[80%] md:h-12 object-contain grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500" 
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
