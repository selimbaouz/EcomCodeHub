import { GoStarFill, GoStar } from "react-icons/go";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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