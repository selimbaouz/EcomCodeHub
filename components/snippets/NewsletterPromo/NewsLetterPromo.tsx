"use client";

import React from "react";
import { cn } from "@/lib/utils"; // facultatif selon ton projet
import ContainerSnippet from "../ContainerSnippet";

export default function DiscountNewsletter() {
  return (
    <ContainerSnippet>
      <section className="bg-[#f7f9fe] p-6 rounded-md max-w-3xl mx-auto shadow-sm">
        <h2 className="text-sm font-bold tracking-widest text-[#101540] uppercase mb-2">
          -15% DE RÉDUCTION
        </h2>
        <p className="text-[#101540] text-sm md:text-base mb-4 leading-relaxed">
          -15% sur votre première commande. Les inscrits à la newsletter ont des
          avantages uniques : promotions et nouveautés en avant-première,
          conseils santé et astuces nutrition.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 mt-4">
          <input
            type="email"
            placeholder="Votre e-mail"
            className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-[#0d1c55] text-white font-semibold px-6 py-3 text-sm rounded hover:brightness-110 transition-all"
          >
            Je m'inscris !
          </button>
        </form>
      </section>
    </ContainerSnippet>
  );
}
