"use client";

const percentages = [
  {
    percentage: "96%",
    text: (
      <>
        des utilisateurs remarquent une{" "}
        <strong>diminution significative de la chute de cheveux dès les premières semaines</strong>.
      </>
    ),
  },
  {
    percentage: "93%",
    text: (
      <>
        affirment que <strong>leurs cheveux sont plus forts, plus brillants</strong> et qu’ils ont{" "}
        <strong>retrouvé confiance en eux</strong>.
      </>
    ),
  },
  {
    percentage: "97%",
    text: (
      <>
        constatent une <strong>repousse visible</strong> et une <strong>chevelure plus dense</strong> après un mois
        d’utilisation régulière.
      </>
    ),
  },
];

function Circle({ percentage }: { percentage: string }) {
  const numeric = parseInt(percentage.replace("%", ""));
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (numeric / 100) * circumference;

  return (
    <svg className="w-16 h-16 shrink-0" viewBox="0 0 60 60">
      <circle
        className="text-gray-200"
        stroke="currentColor"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx="30"
        cy="30"
      />
      <circle
        className="text-yellow-500"
        stroke="currentColor"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx="30"
        cy="30"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 30 30)"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14"
        className="fill-yellow-600 font-bold"
      >
        {percentage}
      </text>
    </svg>
  );
}

export default function WhyTheyLove() {
  return (
    <div className="py-10 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Pourquoi ils l’adorent ? <span className="text-yellow-500">💛</span>
      </h2>
      {percentages.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-gray-200 pb-4"
        >
          <Circle percentage={item.percentage} />
          <p className="text-sm text-gray-800 leading-snug">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
