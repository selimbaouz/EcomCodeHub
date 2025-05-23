"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function ProductReviewCard() {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm text-[#001c3c] text-sm max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-base">Flora J.</p>
          <p className="text-green-600 flex items-center gap-1 text-sm">
            Acheteur vérifié <span>✔</span>
          </p>
          <p className="text-xs mt-1 text-[#1c3b6b] flex items-center gap-1">✔ Je recommande ce produit</p>
        </div>
        <p className="text-xs text-gray-500">29 avril 2025</p>
      </div>

      {/* Title + Rating */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 text-yellow-500 text-2xl leading-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <p className="text-lg font-semibold leading-snug">Toujours aussi satisfait</p>
        <p className="text-[#1c3b6b] text-[15px] leading-relaxed">
          Cela m’apporte un vrai plus au quotidien. Le produit est simple à utiliser et j’ai noté une nette amélioration.
        </p>
      </div>

      {/* Infos */}
      <div className="flex gap-12">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-semibold">Âge</p>
          <p className="text-sm">35 - 44</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-semibold">Genre</p>
          <p className="text-sm">Femme</p>
        </div>
      </div>

      {/* Tags */}
      <div>
        <p className="text-xs font-semibold text-gray-600">Bénéfices observés</p>
        <p className="text-sm text-[#1c3b6b]">Énergie, Concentration, Bien-être général</p>
      </div>

      {/* Evaluation bars */}
      <div className="space-y-4">
        {[
          { label: "Énergie", level: 3 },
          { label: "Concentration", level: 2 },
          { label: "Efficacité", level: 1 },
        ].map(({ label, level }, index) => (
          <div key={index}>
            <p className="text-sm font-medium">{label}</p>
            <div className="flex items-center gap-2 mt-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 w-1/5 rounded",
                    i < level ? "bg-green-400" : "bg-gray-200"
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Peu efficace</span>
              <span>Très efficace</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
