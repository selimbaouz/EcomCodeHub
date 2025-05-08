"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { faker } from '@faker-js/faker';
import Product from "@/public/images/product.webp";

// Définition des packs avec prix ponctuel et abonnement
const packs = [
  { name: "Pack Débutant", ponctuel: "29.90€", abonnement: "20,93€" },
  { name: "Pack Avancé", ponctuel: "54.90€", abonnement: "38,43€" },
  { name: "Pack Pro", ponctuel: "79.90€", abonnement: "55,93€" },
];

// Génère une date au format demandé
function generateRandomDate() {
    const hoursAgo = Math.floor(Math.random() * 240); // Jusqu'à 10 jours
    if (hoursAgo > 168) {
      return "Récemment";
    } else if (hoursAgo > 48) {
      const days = Math.floor(hoursAgo / 24);
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (hoursAgo > 24) {
      return "Il y a 2 jours";
    } else {
      return `Il y a ${hoursAgo} heure${hoursAgo > 1 ? 's' : ''}`;
    }
  }

// Génère une commande aléatoire
function generateRandomOrder() {
  const pack = packs[Math.floor(Math.random() * packs.length)];
  const priceType = Math.random() < 0.5 ? 'ponctuel' : 'abonnement';
  return {
    name: faker.person.firstName(),
    product: pack.name,
    date: generateRandomDate(),
    price: pack[priceType],
    image: Product,
  };
}

export function PurchasePopup() {
  const [index, setIndex] = useState(0);
  const [orders] = useState(() => Array(5).fill(null).map(() => generateRandomOrder()));

  useEffect(() => {
    const showNotification = () => {
      const current = orders[index];
      toast(
        <div className="flex items-center gap-3">
          <Image
            src={current.image}
            width={56}
            height={56}
            alt="User avatar"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <p>
              <strong>{current.name}</strong> a commandé le <strong>{current.product}</strong>
            </p>
            <p className="text-sm mt-0.5 text-gray-500">
                {current.date}
            </p>
          </div>
        </div>,
        { duration: 5000 }
      );
    };

    showNotification();
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % orders.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [index, orders]);

  return null;
}
