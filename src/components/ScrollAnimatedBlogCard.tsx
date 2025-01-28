"use client"
import { motion } from "framer-motion"

interface Props {
  title: string
  description: string
  publishDate: Date
  slug: string
  category: string
  index: number
}

export default function ScrollAnimatedBlogCard({ title, description, publishDate, slug, category, index }: Props) {
  const formattedDate = new Date(publishDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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
      viewport={{ once: true, margin: "-100px" }}
      className="group py-8 first:pt-0 border-b border-surface-200 dark:border-surface-700/50 last:border-0"
    >
      <motion.a
        href={`/blog/${slug}`}
        className="block space-y-4 transition-all duration-300 hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <motion.span
            className="px-3 py-1 text-xs font-medium rounded-full bg-primary-100/50 
                     dark:bg-primary-500/10 text-primary-700 dark:text-primary-300
                     transition-colors duration-300 group-hover:bg-primary-200/50 
                     dark:group-hover:bg-primary-500/20"
            whileHover={{ scale: 1.05 }}
          >
            {category}
          </motion.span>
          <time className="text-surface-500 dark:text-surface-400" dateTime={publishDate.toISOString()}>
            {formattedDate}
          </time>
        </div>

        <h2
          className="text-2xl font-bold text-surface-900 dark:text-surface-50 
                   group-hover:text-primary-600 dark:group-hover:text-primary-400 
                   transition-colors duration-300"
        >
          {title}
        </h2>

        <p className="text-surface-600 dark:text-surface-300 leading-relaxed">{description}</p>

        <div className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium pt-2">
          <span className="text-sm">Leer más</span>
          <motion.svg
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </div>
      </motion.a>
    </motion.article>
  )
}

