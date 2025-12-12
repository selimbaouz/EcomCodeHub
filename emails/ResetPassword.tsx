import React from "react";
import {
  Button,
  Container,
  Section,
  Text,
  Hr,
  Tailwind,
  Link,
  Head,
} from "@react-email/components";
import { cn } from "@/lib/utils";

interface EmailConfirmProps {
  token: string;
}

const ResetPassword = ({ token }: EmailConfirmProps) => {
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
            <Text className="text-8xl text-foreground font-medium">
              EcomCodeHub
            </Text>
            <Text className="text-3xl mt-8 text-foreground font-medium">
              Réinitialisation de votre mot de passe
            </Text>
          </Section>
          <Hr />
          <Section className="mt-10 mb-10 text-center font-medium w-full">
            <Text className="text-base text-left md:mb-5">Bonjour,</Text>
            <Text className="text-base text-left md:mb-5">
              Nous avons reçu une demande de réinitialisation de votre mot de
              passe pour votre compte EcomCodeHub. Si vous n'avez pas fait cette
              demande, veuillez ignorer ce message.
            </Text>
            <Text className="text-base text-left md:mb-5">
              Sinon, veuillez cliquer sur le bouton ci-dessous pour
              réinitialiser votre mot de passe :
            </Text>
            <Button
              href={`https://ecomcodehub.com/auth/new-password?token=${token}`}
              className={cn(
                "bg-primary text-white w-max mx-auto text-center shadow text-base hover:bg-primary/90 p-4 lg:px-6 lg:py-4 rounded-md font-medium mt-4 mb-10"
              )}
            >
              Réinitialiser mon mot de passe
            </Button>
            <Text className="text-base text-left md:mb-5">
              Ce lien est valable pendant 30 minutes. Si le lien expire, vous
              pouvez demander un nouveau lien de réinitialisation sur notre
              site.
            </Text>
            <Text className="text-base text-left md:mb-5">
              Si vous avez des questions ou des préoccupations, n'hésitez pas à
              contacter notre support à l'adresse{" "}
              <Link
                href="mailto:slmrsv.bz@gmail.com"
                target="_blank"
                className="underline"
              >
                slmrsv.bz@gmail.com
              </Link>
              .
            </Text>
            <Text className="text-base text-left md:mb-5">
              Merci de votre confiance,
            </Text>
            <Text className="text-base text-left md:mb-5">
              L'équipe EcomCodeHub
            </Text>
          </Section>
          <Hr />
        </Section>
        <Section className="text-left leading-[24px] mb-10">
          <Text className="text-[12px]">
            EcomCodeHub ne vous enverra jamais de courrier électronique vous
            demandant de divulguer ou de vérifier votre mot de passe, votre
            carte de crédit ou votre numéro de compte bancaire.
          </Text>
          <Text className="text-[12px]">
            Ce message a été produit et distribué par{" "}
            <Link
              href="https://ecomcodehub.com"
              target="_blank"
              className="underline"
            >
              EcomCodeHub
            </Link>
            .
          </Text>
          <Text className="text-[12px]">Tous droits réservés.</Text>
          <Text className="text-[12px]">
            Voir notre{" "}
            <Link
              href={`https://ecomcodehub.com/en/legals/privacy-policy`}
              target="_blank"
              className="underline"
            >
              politique de confidentialité
            </Link>
            .
          </Text>
        </Section>
      </Container>
    </Tailwind>
  );
};

export default ResetPassword;
