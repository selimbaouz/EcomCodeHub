import React from 'react';
import { Container, Section, Text, Hr, Tailwind, Link, Head } from "@react-email/components";

const NewCodes = ({ codeCount }: { codeCount: number }) => {
  return (
    <Tailwind>
      <Head>
        <style>
          {`
            @media (min-width: 768px) {
              .md\\:block {
                display: block;
              }
              .md\\:hidden {
                display: none;
              }
            }
          `}
        </style>
      </Head>
      <Container className="mx-auto w-full text-center font-montserrat text-foreground">
        <Section> 
          <Section className="my-14">
            <Text className='text-8xl text-foreground font-medium'>
              TailwindLiquid
            </Text>
            <Text className='text-3xl mt-8 text-foreground font-medium'>
            🚀 De nouveaux codes sont disponibles !
            </Text>
          </Section>
          <Hr />
          <Section className='mt-10 mb-10 text-center font-medium w-full'>
            <Text className='text-base text-left md:mb-5'>
            Bonjour,
            </Text>
            <Text className='text-base text-left md:mb-5'>
            Nous venons d'ajouter {codeCount} nouveaux codes sur TailwindLiquid. Connectez vous pour les découvrir ! 
            <Link href="https://tailwindliquid.com" target="_blank" className='underline'>
              Voir les nouveaux codes
              </Link>.
            </Text>
            <Text className='text-base text-left md:mb-5'>
            Si vous avez des questions ou des préoccupations, n'hésitez pas à contacter notre support à l'adresse {" "}
              <Link href="mailto:tailwindliquid@gmail.com" target="_blank" className='underline'>
              tailwindliquid@gmail.com
              </Link>.
            </Text>
            <Text className='text-base text-left md:mb-5'>
            Merci de votre confiance,
            </Text>
            <Text className='text-base text-left md:mb-5'>
            L'équipe TailwindLiquid
            </Text>
          </Section>
          <Hr />
        </Section>
        <Section className="text-left leading-[24px] mb-10">
          <Text className='text-[12px]'>
          TailwindLiquid ne vous enverra jamais de courrier électronique vous demandant de divulguer ou de vérifier votre mot de passe, votre carte de crédit ou votre numéro de compte bancaire.
          </Text>
          <Text className='text-[12px]'>
        Ce message a été produit et distribué par <Link href="https://tailwindliquid.com" target="_blank" className='underline'>TailwindLiquid</Link>. 
          </Text>
          <Text className='text-[12px]'>
        Tous droits réservés. 
          </Text>
          <Text className='text-[12px]'>
        Voir notre{" "}
            <Link href={`https://foodnd.app/legal/privacy`} target="_blank" className='underline'>
          politique de confidentialité
            </Link>
          .
          </Text>
        </Section>
      </Container>
    </Tailwind>
  );
};

export default NewCodes;