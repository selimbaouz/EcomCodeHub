import React from 'react';

const CreditsGratuits = () => {
  return (
    <div className="px-4 py-10 max-w-4xl mx-auto dark:bg-[#324e58] h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Gagnez 15 crédits en quelques secondes ✨
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        Vous aimez TailwindLiquid ? Nous aussi, et on aimerait que le monde le sache !
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        En partageant votre expérience, vous nous aidez à grandir, et en retour, on vous remercie avec
        <strong> 15 crédits gratuits</strong> à utiliser pour débloquer des snippets.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            1. Partagez votre avis
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Racontez ce que vous avez aimé sur TailwindLiquid, comment cela vous a aidé, ou ce que vous attendez de la suite. Un petit mot peut faire une grande différence 🙏
          </p>
          <a
            href="https://www.google.com/search?nfpr=1&q=avis+sur+tailwindliquid+toulon&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzxCAX6Y-MYBdJ0ccMN9jN6O3luQYWsCh1ZGoHrBO0TmH8se3GhEtOTHRS4jHKd-1G7rIAi-UJbWYyHBd1lVI2Y08ulWT3urDb1OwkTXjLCoGX2iH3UaDvy6wJvHpJeEg92T5jMGFzaHf1ec5dXHEukjzS_tg&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E9EshZX3GWIEXaoNNU90bh_GkICpSnqz5VUaDlBAC5fxsnm6iIVGvzaFMLWZfBRgqgBEygDDBMl7G1_cupIIhwZfW6StRuL_Mn7-82Co5iLLhlcbLw%3D%3D&stq=1&cs=1&lei=VJpMaOPKMKHX7M8PtqWQgQo&safe=strict"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-600 dark:text-blue-400 underline font-medium"
          >
            👉 Laisser un avis sur Google
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            2. Montrez-nous votre message
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Une fois l’avis publié, prenez une capture d’écran (avec la date visible) et envoyez-la par e-mail à l'adresse : tailwindliquid@gmail.com, sur Whatsapp
            ou sur notre serveur Discord.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            3. Recevez vos crédits
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Dès réception et vérification de votre message, vos <strong>15 crédits</strong> seront ajoutés à votre compte
            sous 24h. C’est notre façon de vous dire merci ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditsGratuits;
