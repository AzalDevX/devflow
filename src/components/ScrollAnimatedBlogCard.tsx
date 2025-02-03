'use client';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  description: string;
  publishDate: Date;
  slug: string;
  category: string;
  readingTime: number;
  index: number;
}

export default function ScrollAnimatedBlogCard({
  title,
  description,
  publishDate,
  slug,
  category,
  readingTime,
  index,
}: Props) {
  const formattedDate = new Date(publishDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
        },
      }}
      viewport={{ once: true, margin: '-100px' }}
      className="group py-8 first:pt-0 border-b border-nature-200 dark:border-primary-700/50 last:border-0">
      <motion.a
        href={`/blog/${slug}`}
        className="block space-y-4 transition-all duration-300 hover:-translate-y-1 hover:bg-nature-50/50 dark:hover:bg-primary-800/30 p-4 rounded-xl -mx-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <motion.span
            className="px-3 py-1 text-xs font-medium font-mono rounded-full 
                     bg-primary-100 dark:bg-primary-800/50 
                     text-primary-700 dark:text-accent-300
                     transition-colors duration-300 
                     group-hover:bg-primary-200 dark:group-hover:bg-primary-700/50"
            whileHover={{ scale: 1.05 }}>
            {category}
          </motion.span>
          <div className="flex items-center gap-3 text-secondary-600 dark:text-accent-400 font-mono">
            <time dateTime={publishDate.toISOString()}>{formattedDate}</time>
            <span className="text-secondary-400 dark:text-accent-700">•</span>
            <span>{readingTime} min lectura</span>
          </div>
        </div>

        <motion.h2
          className="text-2xl font-bold font-mono text-primary-800 dark:text-accent-100 
                   group-hover:text-primary-600 dark:group-hover:text-accent-200 
                   transition-colors duration-300"
          whileHover={{ x: 10 }}>
          {title}
        </motion.h2>

        <p className="text-secondary-700 dark:text-accent-300 leading-relaxed">
          {description}
        </p>

        <div className="inline-flex items-center text-primary-600 dark:text-accent-400 font-medium pt-2">
          <span className="text-sm font-mono">Leer más</span>
          <motion.svg
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </div>
      </motion.a>
    </motion.article>
  );
}
