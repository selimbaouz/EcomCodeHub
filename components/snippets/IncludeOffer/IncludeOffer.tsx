"use client";

import {
  TruckIcon,
  CheckBadgeIcon,
  SparklesIcon,
  GiftIcon
} from "@heroicons/react/24/solid";

const offers = [
  {
    name: "Mixeur",
    price: "14€",
    icon: SparklesIcon,
  },
  {
    name: "Cuillère Bambou",
    price: "6€",
    icon: GiftIcon,
  },
  {
    name: "Livraison 48h",
    price: "4,90€",
    icon: TruckIcon,
  },
  {
    name: "Garantie 60 Jours",
    price: "0.00€",
    icon: CheckBadgeIcon,
  },
];

export default function IncludeOffer() {
  return (
    <div className="bg-[#f4ede5] py-6 px-4 rounded-xl text-center">
      <h3 className="font-bold text-lg mb-4">Inclus dans votre commande</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {offers.map((offer, index) => (
          <div key={index} className="border border-dashed p-4 rounded-md relative bg-white">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-0.5 rounded-full line-through">
                {offer.price}
            </div>
            <offer.icon className="h-10 w-10 text-orange-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-yellow-600">OFFERT</p>
            <p className="text-sm font-semibold">{offer.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
