'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contact, whatsappMessages } from '@/data/siteData';

const href = `${contact.whatsappHref}?text=${encodeURIComponent(whatsappMessages.general)}`;

export default function WhatsAppFloat() {
  const reduceMotion = useReducedMotion();
  const [tucked, setTucked] = useState(false);

  // On small screens the button steps aside while the booking form is on screen
  // so it never covers the form's controls.
  useEffect(() => {
    const section = document.getElementById('booking');
    if (!section || typeof IntersectionObserver === 'undefined') return undefined;

    const mobile = window.matchMedia('(max-width: 1023px)');
    const observer = new IntersectionObserver(
      ([entry]) => setTucked(entry.isIntersecting && mobile.matches),
      { threshold: 0.01 }
    );

    observer.observe(section);
    const onChange = () =>
      setTucked(
        mobile.matches && section.getBoundingClientRect().top < window.innerHeight
      );
    mobile.addEventListener('change', onChange);

    return () => {
      observer.disconnect();
      mobile.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${contact.whatsappDisplay} on WhatsApp`}
      aria-hidden={tucked}
      tabIndex={tucked ? -1 : 0}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: tucked ? 0 : 1, scale: tucked ? 0.9 : 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion || tucked ? undefined : { scale: 1.06 }}
      whileTap={reduceMotion || tucked ? undefined : { scale: 0.97 }}
      className={`group fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-colors hover:bg-[#1eb459] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 ${
        tucked ? 'pointer-events-none' : ''
      }`}
    >
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-2 text-[9px] uppercase tracking-label text-cream-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
        Chat on WhatsApp
      </span>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="h-[22px] w-[22px] sm:h-6 sm:w-6"
        fill="currentColor"
      >
        <path d="M19.11 17.53c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.19.29-.76.95-.93 1.14-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.17-.24-.57-.48-.5-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43s1.04 2.82 1.19 3.01c.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.7.22 1.33.19 1.83.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34zM16.18 28h-.01c-2.13 0-4.22-.57-6.05-1.64l-.43-.26-4.5 1.18 1.2-4.39-.28-.45a11.79 11.79 0 0 1-1.82-6.31c0-6.53 5.32-11.84 11.86-11.84 3.17 0 6.14 1.23 8.38 3.47a11.75 11.75 0 0 1 3.47 8.38c0 6.53-5.32 11.86-11.82 11.86zM27.55 4.45A15.25 15.25 0 0 0 16.18.56C7.79.56.96 7.38.96 15.76c0 2.68.7 5.29 2.03 7.6L.86 31.44l8.27-2.17a15.2 15.2 0 0 0 7.05 1.8h.01c8.38 0 15.21-6.82 15.21-15.2 0-4.06-1.58-7.88-4.45-10.75z" />
      </svg>
    </motion.a>
  );
}
