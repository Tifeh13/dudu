'use client';

import { useReducedMotion } from 'framer-motion';

export default function BookServiceButton({ serviceId, label = 'Book Appointment' }) {
  const reduceMotion = useReducedMotion();

  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent('duduyemi:select-service', { detail: { serviceId } })
    );
    const section = document.getElementById('booking');
    section?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <button type="button" onClick={handleClick} className="btn-ghost">
      {label}
    </button>
  );
}
