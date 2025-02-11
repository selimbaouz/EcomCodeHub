"use client";

import { useEffect } from "react";
import { useCartStore } from "../../store/cart"; // Assurez-vous que c'est bien l'import correct pour vider le panier.

const CartTimer = () => {
  const {clearCart, timeLeft, setTimeLeft, cart} = useCartStore();
  useEffect(() => {
    if(cart.lines.length === 0) {
      setTimeLeft(0);
    }

    if (timeLeft <= 1) {
      clearCart(); // Vide le panier lorsque le timer atteint zéro
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer); // Nettoie l'intervalle lors de la destruction du composant
  }, [timeLeft, clearCart, setTimeLeft, cart.lines.length]);

  // Formate les secondes restantes en "MM:SS"
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <p className="text-sm text-white">
      🔥 Votre panier est réservé pour {formatTime(timeLeft)} minutes !
    </p>
  );
};

export default CartTimer;
