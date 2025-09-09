"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import ContainerSnippet from "../ContainerSnippet";

const ratings = [
  { stars: 5, count: 613 },
  { stars: 4, count: 29 },
  { stars: 3, count: 6 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

const totalReviews = ratings.reduce((acc, r) => acc + r.count, 0);
const images = [
  "/images/reviews/1.jpg",
  "/images/reviews/2.jpg",
  "/images/reviews/3.jpg",
  "/images/reviews/4.jpg",
  "/images/reviews/5.jpg",
  "/images/reviews/6.jpg",
  "/images/reviews/7.jpg",
  "/images/reviews/8.jpg",
];

export default function ReviewSummary() {
  const averageRating = (ratings.reduce((acc, r) => acc + r.stars * r.count, 0) / totalReviews).toFixed(1);

  return (
    <ContainerSnippet>
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col lg:flex-row gap-10 items-start">
        {/* Average & Stars */}
        <div className="flex flex-col items-center text-center w-full lg:w-[200px]">
          <h2 className="text-lg font-semibold mb-1">Avis Clients</h2>
          <p className="text-3xl font-bold">{averageRating}</p>
          <div className="flex text-yellow-400 mt-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-5 w-5" />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">{totalReviews} avis</p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex flex-col w-full lg:max-w-[300px] gap-2">
          {ratings.map(({ stars, count }) => {
            const percent = (count / totalReviews) * 100;
            return (
              <div key={stars} className="flex items-center text-sm">
                <span className="w-[60px]">{stars} étoiles</span>
                <div className="flex-1 mx-2 bg-gray-200 rounded h-2 relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-yellow-400"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </ContainerSnippet>
  );
}
