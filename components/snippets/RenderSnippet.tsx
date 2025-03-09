import React, { FC, useEffect, useRef } from "react";

interface RenderSnippetProps {
  code: string;
}

export const RenderSnippet: FC<RenderSnippetProps> = ({ code }) => {
    const injectedHTML = `
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com/3.4.0"></script>
              <script defer src="https://cdn.jsdelivr.net/npm/embla-carousel/embla-carousel.umd.js"></script>
              <script defer src="https://cdn.jsdelivr.net/npm/date-fns@latest"></script>
              <script defer src="https://cdn.jsdelivr.net/npm/date-fns/locale/fr"></script>
              <script>
                // Configuration de Tailwind avec un préfixe personnalisé
                tailwind.config = {
                prefix: 'tw-', // Ajoute 'tw-' comme préfixe à toutes les classes Tailwind
                theme: {
                    extend: {
                        fontSize: {
                            xxs: ['10px', { lineHeight: '14px' }], 
                            xs: ['12px', { lineHeight: '16px' }], // Très petit texte
                            sm: ['14px', { lineHeight: '20px' }], // Petit texte
                            base: ['16px', { lineHeight: '24px' }], // Texte par défaut
                            lg: ['18px', { lineHeight: '28px' }], // Texte légèrement plus grand
                            xl: ['20px', { lineHeight: '28px' }], // Titre principal
                            '2xl': ['24px', { lineHeight: '32px' }], // Sous-titres ou titres importants
                            '3xl': ['30px', { lineHeight: '36px' }], // Titres principaux plus grands
                            '4xl': ['36px', { lineHeight: '40px' }], // Titres très grands
                            '5xl': ['48px', { lineHeight: '1' }],   // Titres énormes
                        },
                        fontWeight: {
                            thin: 100,
                            extralight: 200,
                            light: 300,
                            normal: 400,
                            medium: 500,
                            semibold: 600,
                            bold: 700,
                            extrabold: 800,
                            black: 900,
                        },
                        },
                        screens: {
                        xs: '370px',
                        sm: '420px',
                        md: '760px',
                        lg: '1020px',
                        xl: '1400px',
                        '2xl': '1700px',
                        '3xl': '2500px'
                        },
                    },
                };
                </script>
        <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
        </style>
    </head>
    <body>
        ${code}
    </body>
    </html>
`;

  return (
    <div className="flex justify-center items-center w-full h-full">
        <iframe 
            srcDoc={injectedHTML} 
            className="w-full h-full border-none"
            sandbox="allow-scripts"
        />
    </div>
  );
};
