import React from 'react';
import { Container, Section, Text, Hr, Tailwind, Link } from "@react-email/components";

interface TwoFactorEmailProps {
    token: string;
}

const TwoFactorEmail = ({token}: TwoFactorEmailProps) => {
  return (
    <Tailwind>
      <Container className="mx-auto w-full text-center font-montserrat text-foreground">
        <Section className='w-full'> 
          <Section className="my-14">
            <Text className='text-8xl text-foreground font-medium'>
            TailwindLiquid
            </Text>
            <Text className='text-3xl mt-8 text-foreground font-medium'>
            Authentification à deux facteurs
            </Text>
          </Section>
          <Hr />
          <Section className='mt-10 mb-10 text-center font-medium w-full'>
            <Text className='text-base text-left md:mb-5'>
            Bonjour,
            </Text>
            <Text className='text-base text-left md:mb-5'>
            Pour renforcer la sécurité de votre compte, vous avez activé l'authentification à deux facteurs (2FA).
            </Text>
            <Text className='text-base text-left md:mb-5'>
            Veuillez insérez le code ci-dessous pour vérifier votre identité :
            </Text>
            <Text className='text-base text-left md:mb-5'>
              {token}
            </Text>
            <Text className='text-base text-left md:mb-5'>
            Ce lien est valable pendant 10 minutes. Si vous n'avez pas demandé cette vérification, veuillez ignorer ce message ou contacter notre support à l'adresse {" "}
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
            <Link href={`https://tailwindliquid.com/legal/privacy`} target="_blank" className='underline'>
          politique de confidentialité
            </Link>
          .
          </Text>
        </Section>
      </Container>
    </Tailwind>
  );
};

export default TwoFactorEmail;