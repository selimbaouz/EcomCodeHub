import { FaUsers, FaHeadset, FaMoneyBillWave, FaLock } from "react-icons/fa";

const trustBadges = [
  {
    icon: <FaUsers size={32} />,
    title: "Des résultats concrets, des clients conquis",
    description: "Rejoignez la communauté et ressentez la différence.",
  },
  {
    icon: <FaHeadset size={32} />,
    title: "Support 24/7",
    description: "Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions.",
  },
  {
    icon: <FaMoneyBillWave size={32} />,
    title: "Satisfait ou remboursé",
    description: "Votre satisfaction avant tout - retour simple et sans question.",
  },
  {
    icon: <FaLock size={32} />,
    title: "Paiement sécurisé",
    description: "Paiements cryptés pour une sécurité optimale.",
  },
];

export default function TrustBadges() {
  return (
    <div className="w-full py-10 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center px-4">
        {trustBadges.map((badge, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-4 text-black">{badge.icon}</div>
            <h3 className="font-semibold text-sm md:text-base">{badge.title}</h3>
            <p className="text-xs text-gray-600 mt-2">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
