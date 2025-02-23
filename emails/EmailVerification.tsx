import * as React from "react";
import { Button, Container, Section, Text, Hr, Tailwind, Link, Head } from "@react-email/components";
import { cn } from "@/lib/utils";

interface EmailVerificationProps {
    token: string;
}
const EmailVerification = ({
  token,
}: EmailVerificationProps) => {
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
                Confirmation de votre adresse e-mail
            </Text>
          </Section>
          <Hr />
          <Section className='mt-10 mb-10 text-center font-medium w-full'>
            <Text className='text-base text-left mb:mb-5'>
            Bonjour,
            </Text>
            <Text className='text-base text-left mb:mb-5'>
            Bienvenue dans la communauté TailwindLiquid ! Nous sommes ravis de vous compter parmi nous.
            </Text>
            <Text className='text-base text-left mb:mb-5'>
            Pour finaliser votre inscription et commencer à utiliser votre compte, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :
            </Text>
            <Button href={`https://tailwindliquid.com/auth/new-verification?token=${token}`} className={cn('bg-[#259d93] dark:bg-[#259d93] text-white w-full shadow text-base hover:bg-primary/90 py-4 rounded-md font-medium mt-4 mb-10 md:hidden')}>Confirmer mon adresse e-mail</Button>
            <Text className='text-base text-left mb:mb-5'>
              Ce lien est valable pendant 30 minutes. Si vous n'avez pas demandé cette vérification, veuillez ignorer ce message ou contacter notre support à l'adresse {" "}
              <Link href="mailto:tailwindliquid@gmail.com" target="_blank" className='underline'>
              tailwindliquid@gmail.com
              </Link>.
            </Text>
            <Text className='text-base text-left mb:mb-5'>
            Merci de votre confiance,
            </Text>
            <Text className='text-base text-left mb:mb-5'>
            L'équipe TailwindLiquid
            </Text>
          </Section>
          <Hr />
        </Section>
        <Section className="text-left leading-[24px] mb-10">
          <Text className='text-[12px]'>
          TailwindLiquid ne vous demandera jamais de divulguer ou de vérifier votre mot de passe, votre carte de crédit ou votre numéro de compte bancaire.
          </Text>
          <Text className='text-[12px]'>
          Ce message a été produit et distribué par <Link href="https://tailwindliquid.com" target="_blank" className='underline'>TailwindLiquid</Link>. 
          </Text>
          <Text className='text-[12px]'>
          Tous droits réservés. 
          </Text>
          <Text className='text-[12px]'>
          Voir notre{" "}
            <Link href={`https://tailindliquid.com/legal/privacy`} target="_blank" className='underline'>
            politique de confidentialité
            </Link>
          .
          </Text>
        </Section>
      </Container>
    </Tailwind>
  );
};

export default EmailVerification;

