"use client";
import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import { FaCheck, FaRegCopy } from 'react-icons/fa6';
import Image from 'next/image';
import Insta1 from '@/public/images/insta1.png';
import Insta2 from '@/public/images/insta2.png';

export default function InstallationPage() {
    const snippet = {
        code: `<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/date-fns@3.6.0/dist/date-fns.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/embla-carousel@8.0.0/embla-carousel.umd.js"></script>
<script>
    // Configuration de Tailwind avec un préfixe personnalisé
    tailwind.config = {
        prefix: 'tw-',
        theme: {
            extend: {
            animation: {
                gradient: 'gradientBg 10s ease infinite',
            },
            keyframes: {
                gradientBg: {
                '0%, 100%': {
                    'background-position': '0% 50%',
                },
                '50%': {
                    'background-position': '100% 50%',
                },
                },
            },
            backgroundSize: {
                'gradient-size': '200% 200%',
            },
            fontSize: {
                xxs: ['10px', { lineHeight: '14px' }],
                xs: ['12px', { lineHeight: '16px' }],
                sm: ['14px', { lineHeight: '20px' }],
                base: ['16px', { lineHeight: '24px' }],
                lg: ['18px', { lineHeight: '28px' }],
                xl: ['20px', { lineHeight: '28px' }],
                '2xl': ['24px', { lineHeight: '32px' }],
                '3xl': ['30px', { lineHeight: '36px' }],
                '4xl': ['36px', { lineHeight: '40px' }],
                '5xl': ['48px', { lineHeight: '1' }],
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
</script>`
    };
    var pretty = require('pretty');
    const formattedCode = pretty(snippet.code, { ocd: true });

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(formattedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="px-4 py-10 max-w-4xl mx-auto dark:bg-[#324e58] h-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Installation de TailwindLiquid</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                Pour activer TailwindLiquid sur votre boutique Shopify, suivez les étapes ci-dessous :
            </p>

            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Connectez-vous à votre interface Shopify.</li>
                <li>Dans la barre latérale, cliquez sur <strong>"Canaux de vente"</strong > → <strong>"Thèmes"</strong>.</li>
                <li>Cliquez sur les <strong>trois petits points</strong> à côté du bouton "Personnaliser" puis cliquez sur <strong>"Modifier le code"</strong>.</li>
                <Image
                    src={Insta1.src}
                    alt="first image for more explaination"
                    width={Insta1.width}
                    height={Insta1.height}
                    className='py-4'
                />
                <li>Dans la colonne de gauche, ouvrez le dossier <strong>"Layout"</strong> puis cliquez sur <strong>"theme.liquid"</strong>.</li>
                <li>Repérez la <strong>ligne 30</strong> ou entre {"{% render 'meta-tags' %}"} et {`<script src="{{ 'constants.js' | asset_url }}" defer="defer"></script>`}, donc là où se trouvent les autres balises <code>&lt;script&gt;</code> comme l'image ci-dessous.</li>
                <Image
                    src={Insta2.src}
                    alt="first image for more explaination"
                    width={Insta2.width}
                    height={Insta2.height}
                    className='py-4'
                />
                <li>Copiez et collez le code suivant :</li>
            </ol>

            <div className="my-6 relative">
                <CodeBlock code={formattedCode} />
                <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 bg-gray-100 border text-foreground rounded-lg hover:bg-gray-200 transition"
                >
                    {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />}
                </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
                Une fois le code collé et sauvegardé, vous pouvez utiliser les classes Tailwind avec le préfixe <code>tw-</code>, par exemple <code>tw-bg-red-500</code>.
            </p>
        </div>
    );
}
