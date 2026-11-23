'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * A restrained fade-up reveal used across the page. Motion is disabled for
 * visitors who prefer reduced motion.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 20,
  duration = 0.8,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
