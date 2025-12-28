import React from "react";
import {
  Container,
  Section,
  Text,
  Hr,
  Tailwind,
  Link,
  Head,
  Button,
} from "@react-email/components";

const SuccessPurchase = ({ name }: { name: string }) => {
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
              Thank you for your purchase {!name ? "" : `, ${name}`}! 🎉
            </Text>
          </Section>
          <Hr />
          <Section className="mt-10 mb-10 text-center font-medium w-full">
            <Text className="text-base text-left md:mb-5">Hi {name},</Text>
            <Text className="text-base text-left md:mb-5">
              Thank you for purchasing the Pro Conversion Pack! Your payment has
              been confirmed successfully.
            </Text>
            <Text className="text-base text-left md:mb-5">
              <strong>📋 Next step to access your 500+ snippets:</strong>
            </Text>
            <Text className="text-base text-left md:mb-5">
              Click the button below to register in our Notion workspace. Once
              you've signed up, I'll validate your access{" "}
              <strong>within 24 hours</strong> (most customers get access within
              a few hours).
            </Text>
            <Section className="text-center my-8">
              <Button
                href="https://www.notion.so/2c707dc9110780eaaf8ffc6094414988?v=2c707dc911078197a7fa000cc412f9df&source=copy_link"
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-base"
              >
                Access My Notion Workspace
              </Button>
            </Section>
            <Text className="text-base text-left md:mb-5">
              After I validate your access, you'll be able to browse all{" "}
              <strong>500+ organized snippets</strong> and copy-paste them
              directly into your Shopify store—instantly.
            </Text>
            <Text className="text-base text-left md:mb-5">
              <strong>⚠️ Haven't received access after 24 hours?</strong>{" "}
              Contact me directly at{" "}
              <Link
                href="mailto:ecomcodehub.team@gmail.com"
                target="_blank"
                className="underline"
              >
                ecomcodehub.team@gmail.com
              </Link>{" "}
              and I'll prioritize your access immediately.
            </Text>
            <Text className="text-base text-left md:mb-5">
              Thank you for your trust,
            </Text>
            <Text className="text-base text-left md:mb-5">
              The EcomCodeHub Team
            </Text>
          </Section>
          <Hr />
        </Section>
        <Section className="text-left leading-[24px] mb-10">
          <Text className="text-[12px]">
            EcomCodeHub will never email you asking to disclose or verify your
            password, credit card, or bank account number.
          </Text>
          <Text className="text-[12px]">
            This message was produced and distributed by{" "}
            <Link
              href="https://ecomcodehub.com"
              target="_blank"
              className="underline"
            >
              EcomCodeHub
            </Link>
            .
          </Text>
          <Text className="text-[12px]">All rights reserved.</Text>
          <Text className="text-[12px]">
            See our{" "}
            <Link
              href={`https://ecomcodehub.com/en/legals/privacy-policy`}
              target="_blank"
              className="underline"
            >
              privacy policy
            </Link>
            .
          </Text>
        </Section>
      </Container>
    </Tailwind>
  );
};

export default SuccessPurchase;
