"use client";

import { cn } from "@/lib/utils";
import ContainerSnippet from "../ContainerSnippet";

const reviewData = [
  { stars: 5, count: 644 },
  { stars: 4, count: 69 },
  { stars: 3, count: 12 },
  { stars: 2, count: 2 },
  { stars: 1, count: 0 },
];

const maxCount = Math.max(...reviewData.map((r) => r.count));

export default function ReviewStats() {
  return (
    <ContainerSnippet>
      <div className="w-full max-w-xs">
        <h3 className="text-xl font-bold text-center mb-4">Avis clients</h3>
        <div className="space-y-3">
          {reviewData.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex text-black text-xl min-w-[90px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < stars ? "★" : "☆"}</span>
                ))}
              </div>
              <div className="flex-1 h-3 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-black"
                  style={{
                    width: `${(count / maxCount) * 100}%`,
                  }}
                />
              </div>
              <span className="w-8 text-sm text-gray-700 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </ContainerSnippet>
  );
}
