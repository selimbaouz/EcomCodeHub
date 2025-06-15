import { cn } from '@/lib/utils';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';

// Remplace ce numéro par le tien (format international sans +)
const WHATSAPP_NUMBER = '33745473667'; // Exemple : 33612345678 pour +33 6 12 34 56 78

function isOpenNow() {
  // Obtenir la date et l'heure actuelles à Paris
  const now = new Date();
  const options = { timeZone: 'Europe/Paris', hour12: false };
  const parisDate = new Date(now.toLocaleString('en-US', options));
  const day = parisDate.getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const hour = parisDate.getHours();

  // Ouvert du lundi (1) au vendredi (5), de 9h à 18h inclus
  const isWeekday = day >= 1 && day <= 5;
  const isOpenHour = hour >= 9 && hour < 18; // 18h exclu

  return isWeekday && isOpenHour;
}

const WhatsApp = () => {
  const open = isOpenNow();

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className={cn(
        "fixed z-50 bottom-8 right-6 size-16 lg:size-24 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      )}
    >
      <div
        className={cn(
          'size-3 lg:size-5 rounded-full absolute top-2 left-0',
          open ? 'bg-green-400' : 'bg-red-500'
        )}
      />
      <FaWhatsapp className="size-8 lg:size-12 text-white" />
    </a>
  );
};

export default WhatsApp;
