"use client";

import { cn } from "@/lib/utils";
import ContainerSnippet from "../ContainerSnippet";

const packages = [
  {
    portions: "30 PORTIONS",
    pricePer: "1.30€/café",
    image:
      "https://res.cloudinary.com/ecomcodehub/image/upload/v1747998469/bag1_fwtnww.png", // à remplacer par ton image
    highlight: null,
  },
  {
    portions: "60 PORTIONS",
    pricePer: "1.15€/café",
    image:
      "https://res.cloudinary.com/ecomcodehub/image/upload/v1747998470/bag2_fnztmb.png",
    highlight: "N°1 des ventes",
  },
  {
    portions: "90 PORTIONS",
    pricePer: "1.10€/café",
    image:
      "https://res.cloudinary.com/ecomcodehub/image/upload/v1747998469/bag3_xyi1ll.png",
    highlight: "Le plus rentable",
  },
];

export default function PackageOptions() {
  return (
    <ContainerSnippet>
      <div className="flex gap-4 justify-center items-end py-8">
        {packages.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              "relative w-full max-w-[180px] border border-gray-300 rounded-md p-4 flex flex-col items-center text-center transition-all duration-300 hover:border-black hover:shadow-lg hover:scale-[1.02]"
            )}
          >
            {item.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-md font-medium">
                {item.highlight}
              </div>
            )}
            <img
              src={item.image}
              alt={item.portions}
              className="h-28 mx-auto object-contain mb-4"
            />
            <p className="font-bold text-sm">{item.portions}</p>
            <p className="text-sm mt-1 text-gray-700">{item.pricePer}</p>
          </div>
        ))}
      </div>
    </ContainerSnippet>
  );
}
