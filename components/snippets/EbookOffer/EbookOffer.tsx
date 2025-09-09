"use client";

import ContainerSnippet from "../ContainerSnippet";

export default function EbookOffer() {
  return (
    <ContainerSnippet>
      <div className="relative w-full max-w-md mx-auto border border-[#b4a56b] rounded-md p-4 bg-[#fdfcf4]">
        {/* Pastille en haut à droite */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-[#b4a56b] text-white text-[10px] font-bold rounded-full px-3 py-1">
          eBook <br /> OFFERT
        </div>

        <div className="flex items-start gap-4">
          {/* Image du ebook */}
          <div className="w-14 h-20 bg-gray-300 rounded-sm" />

          <div>
            <h3 className="font-semibold text-sm">
              Votre ebook{" "}
              <span className="bg-[#b4a56b] text-white text-[11px] px-2 py-[2px] rounded-sm ml-1">
                OFFERT
              </span>
            </h3>
            <p className="text-xs mt-1">
              <span className="line-through text-gray-500 mr-1">20,00€</span>
              <span className="text-black font-bold">→ 0,00€</span>
            </p>
            <p className="text-[13px] text-gray-800 mt-2 leading-snug">
              Un guide précieux pour renforcer le lien avec votre enfant
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#b4a56b] text-center pt-3 mt-3 text-[13px] text-gray-800">
          Offre limitée aux <strong>79</strong> prochaines commandes
        </div>
      </div>
    </ContainerSnippet>
  );
}
