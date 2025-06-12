import { cn } from '@/lib/utils';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';

// Remplace ce numéro par le tien (format international sans +)
const WHATSAPP_NUMBER = '33745473667'; // Exemple : 33612345678 pour +33 6 12 34 56 78

const WhatsApp = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className={cn(
        "fixed z-50 bottom-8 right-6 size-16 lg:size-24 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      )}
    >
        <div className='size-3 lg:size-5 rounded-full bg-green-400 absolute top-2 left-0'></div>
      <FaWhatsapp className="size-8 lg:size-12 text-white" />
    </a>
  );
};

export default WhatsApp;
