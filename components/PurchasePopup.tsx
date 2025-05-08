"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { fakerFR_BE } from '@faker-js/faker';
import Product from "@/public/images/product.webp";
import { useOpenCartStore } from "@/store/cart";

const packs = [
  { name: "Pack Débutant", ponctuel: "29.90€", abonnement: "20,93€" },
  { name: "Pack Avancé", ponctuel: "54.90€", abonnement: "38,43€" },
  { name: "Pack Pro", ponctuel: "79.90€", abonnement: "55,93€" },
];

function generateRandomDate() {
  const hoursAgo = Math.floor(Math.random() * 240);
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

export function PurchasePopup() {
  const { isOpenCart } = useOpenCartStore();
  const uniqueNames = fakerFR_BE.helpers.uniqueArray(fakerFR_BE.person.firstName, 500);

  const [orders] = useState(() =>
    uniqueNames.map((name) => {
      const pack = packs[Math.floor(Math.random() * packs.length)];
      const priceType = Math.random() < 0.5 ? 'ponctuel' : 'abonnement';
      return {
        name,
        product: pack.name,
        date: generateRandomDate(),
        price: pack[priceType],
        image: Product,
      };
    })
  );
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastIdRef = useRef<string | number | undefined>(undefined);

  useEffect(() => {
    // Ferme le toast si le panier s'ouvre
    if (isOpenCart) {
      toast.dismiss(); // Ferme tous les toasts actifs
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Nettoie l'intervalle précédent
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const showNotification = () => {
      const current = orders[index];
      toastIdRef.current = toast(
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
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % orders.length);
    }, 5500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [index, orders, isOpenCart]);

  return null;
}
