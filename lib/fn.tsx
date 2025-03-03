import { GoStarFill, GoStar } from "react-icons/go";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Cart } from "@/types/types";

export default function GetRatings({ value, className }: { value: number; className: string }) {
  const totalRatings = [0, 0, 0, 0, 0];
  for (let i = 0; i < Math.round(value); i++) {
    totalRatings[i] = 1;
  }
  return (
    <div className="flex items-center space-x-0.5">
      {totalRatings.map((rating, index) => {
        if (rating === 1) {
          return <GoStarFill key={index} className={className} />;
        }
        return <GoStar key={index} className={className} />;
      })}
    </div>
  );
}

export function removeSuffix(input: string) {
  return input.replace(/ \/ .+$/, ""); // Remplace " / ..." par une chaîne vide
}

/**
 * Calcule une plage de dates de livraison.
 * @param {number} startDays - Nombre minimum de jours à partir d'aujourd'hui.
 * @param {number} endDays - Nombre maximum de jours à partir d'aujourd'hui.
 * @returns {string[]} - Tableau contenant les deux dates formatées.
 */
export function calculateDeliveryDates(startDays: number, endDays: number): string[] {
    const today = new Date();
  
    // Calcul des deux dates
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + startDays);
  
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + endDays);
  
    // Formatage des dates (exemple : "29 Janvier")
    const formattedStartDate = format(startDate, "d MMMM", { locale: fr });
    const formattedEndDate = format(endDate, "d MMMM", { locale: fr });
  
    return [formattedStartDate, formattedEndDate];
  }
  
  /**
   * Calcule les dates de commande, d'expédition et de livraison.
   * @param {number} readyMinDays - Nombre minimum de jours avant que la commande soit prête.
   * @param {number} readyMaxDays - Nombre maximum de jours avant que la commande soit prête.
   * @param {number} deliveryMinDays - Nombre minimum de jours pour la livraison après l'expédition.
   * @param {number} deliveryMaxDays - Nombre maximum de jours pour la livraison après l'expédition.
   * @returns {string[]} - Tableau contenant les dates formatées.
   */
  export function calculateDeliverySteps(
    readyMinDays: number,
    readyMaxDays: number,
    deliveryMinDays: number,
    deliveryMaxDays: number
  ): string[] {
    const today = new Date();
  
    // Mapping des mois abrégés personnalisés
    const monthAbbreviations: { [key: string]: string } = {
      janvier: "jan",
      février: "fev",
      mars: "mars",
      avril: "avr",
      mai: "mai",
      juin: "juin",
      juillet: "juil",
      août: "août",
      septembre: "sep",
      octobre: "oct",
      novembre: "nov",
      décembre: "dec",
    };
  
    // Fonction pour formater une date avec les mois abrégés personnalisés
    const formatCustomDate = (date: Date) => {
      const formatted = format(date, "d MMMM", { locale: fr });
      return formatted.replace(
        /(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/,
        (match) => monthAbbreviations[match]
      );
    };
  
    // Date de commande (aujourd'hui)
    const orderDate = formatCustomDate(today);
  
    // Dates où la commande est prête à être expédiée
    const readyStartDate = new Date(today);
    readyStartDate.setDate(today.getDate() + readyMinDays);
    const readyEndDate = new Date(today);
    readyEndDate.setDate(today.getDate() + readyMaxDays);
  
    const formattedReadyDate = `${formatCustomDate(readyStartDate)} - ${formatCustomDate(readyEndDate)}`;
  
    // Dates de livraison estimée
    const deliveryStartDate = new Date(readyEndDate);
    deliveryStartDate.setDate(readyEndDate.getDate() + deliveryMinDays);
    const deliveryEndDate = new Date(readyEndDate);
    deliveryEndDate.setDate(readyEndDate.getDate() + deliveryMaxDays);
  
    const formattedDeliveryDate = `${formatCustomDate(deliveryStartDate)} - ${formatCustomDate(deliveryEndDate)}`;
  
    return [orderDate, formattedReadyDate, formattedDeliveryDate];
  }  