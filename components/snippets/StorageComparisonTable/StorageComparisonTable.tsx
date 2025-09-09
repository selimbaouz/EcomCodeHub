"use client";

import { cn } from "@/lib/utils";
import styles from "./storage-comparison-table.module.css";
import ContainerSnippet from "../ContainerSnippet";

const rows = [
  {
    label: "🥩 Viande rouge",
    regular: "2–4 jours",
    chefglory: "12–15 jours",
  },
  {
    label: "🍗 Poulet",
    regular: "1–2 jours",
    chefglory: "9–12 jours",
  },
  {
    label: "🥦 Légumes",
    regular: "3–5 jours",
    chefglory: "12–20 jours",
  },
  {
    label: "🍖 Viande hachée",
    regular: "1–2 jours",
    chefglory: "8–10 jours",
  },
];

export default function StorageComparisonTable() {
  return (
    <ContainerSnippet>
      <section className={cn("w-full py-8", styles.tableWrapper)}>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-[#2c4049] text-white">
              <tr>
                <th className="py-4 px-4 text-left font-semibold">Aliment</th>
                <th className="py-4 px-4 font-semibold text-center">Conservation normale</th>
                <th className="py-4 px-4 font-semibold text-center">Avec ChefGlory™</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={cn(
                    "border-t",
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  )}
                >
                  <td className="py-4 px-4 text-gray-800 font-medium">{row.label}</td>
                  <td className="text-center text-gray-600">{row.regular} ❌</td>
                  <td className="text-center font-semibold text-green-600">{row.chefglory} ✅</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ContainerSnippet>
  );
}
