"use client";

import {
  CakeIcon,
  GiftIcon,
  HeartIcon,
  UserIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ContainerSnippet from "../ContainerSnippet";

const items = [
  { icon: <CakeIcon className="h-6 w-6 text-[#bfa254]" />, label: "Anniversaire" },
  { icon: <GiftIcon className="h-6 w-6 text-[#bfa254]" />, label: "Baby Shower" },
  { icon: <SparklesIcon className="h-6 w-6 text-[#bfa254]" />, label: "Fête des mères" },
  { icon: <UserIcon className="h-6 w-6 text-[#bfa254]" />, label: "Maman Seule" },
  { icon: <HeartIcon className="h-6 w-6 text-[#bfa254]" />, label: "Maman Malade" },
  { icon: <ClockIcon className="h-6 w-6 text-[#bfa254]" />, label: "Maman Occupée" },
];

export default function PerfectGift() {
  return (
    <ContainerSnippet>
      <div className="bg-[#fefbee] text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          Le <span className="text-[#bfa254]">Cadeau</span> <span className="text-black">Parfait Pour…</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border border-[#ebd8b2] rounded-lg py-8 px-4 flex flex-col items-center justify-center bg-white shadow-sm"
            >
              {item.icon}
              <p className="mt-4 text-sm font-medium text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-600 italic">Et tellement d’autres…</p>
      </div>
    </ContainerSnippet>
  );
}