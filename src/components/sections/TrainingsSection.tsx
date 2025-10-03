import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Training } from '@/hooks/useContent';
import { Card } from '@/components/ui/card';

interface TrainingsSectionProps {
  trainings: Training[];
}

export function TrainingsSection({ trainings }: TrainingsSectionProps) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="trainings" className="py-20 gradient-section" ref={ref}>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t('nav.trainings')}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {trainings.map((training, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">{training.name}</h3>
                    <p className="text-primary font-semibold">{training.issuer}</p>
                    <p className="text-sm text-muted-foreground mt-1">{training.year}</p>
                    {training.id && (
                      <p className="text-xs text-muted-foreground mt-2">
                        ID: {training.id}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}