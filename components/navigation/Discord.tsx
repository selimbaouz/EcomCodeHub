import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { FaDiscord } from 'react-icons/fa6';

// Remplace ce numéro par le tien (format international sans +)
const LINK_DISCORD = 'https://discord.gg/kGayPFck58';

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

const Discord = () => {
  const open = isOpenNow();

  return (
    <Link
      href={LINK_DISCORD}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Rejoignez-nous sur Discord"
      className={cn(
        "fixed z-50 bottom-8 right-6 size-16 lg:size-24 rounded-full bg-[#5662F6] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      )}
    >
      <div
        className={cn(
          'size-3 lg:size-5 rounded-full absolute top-2 left-0',
        )}
      />
      <FaDiscord className="size-8 lg:size-12 text-white" />
    </Link>
  );
};

export default Discord;
