import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { Calendar, MapPin } from 'lucide-react';
import { Experience } from '@/hooks/useContent';
import { Card } from '@/components/ui/card';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const formatDate = (date: string) => {
    if (date === 'current' || date === 'presente') return 'Presente';
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  };

  return (
    <section id="experience" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experiência Profissional
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <p className="text-lg text-primary font-semibold">{exp.company}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(exp.start)} — {formatDate(exp.end)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm">{highlight}</li>
                    ))}
                  </ul>
                )}

                {exp.body_md && (
                  <div className="prose prose-sm dark:prose-invert max-w-none mt-4 text-muted-foreground">
                    <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                      {exp.body_md}
                    </ReactMarkdown>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
