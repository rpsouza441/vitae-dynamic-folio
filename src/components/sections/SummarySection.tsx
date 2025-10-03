import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SummarySectionProps {
  summary: string;
}

export function SummarySection({ summary }: SummarySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="summary" className="py-20 gradient-section" ref={ref}>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Resumo Profissional
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
              {summary}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
