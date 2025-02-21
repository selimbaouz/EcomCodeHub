import EmailVerification from "@/emails/EmailVerification";
import EmailVerified from "@/emails/EmailVerified";
import PasswordChanged from "@/emails/PasswordChanged";
import ResetPassword from "@/emails/ResetPassword";
import TwoFactorEmail from "@/emails/TwoFactorEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_LOCAL_URL;

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: email,
      subject: "Code à 2 facteurs (2FA)",
      react: TwoFactorEmail({token})
    });

    return data;
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: "Réinitialiser votre mot de passe",
      react: ResetPassword({token})
    });

    return data;
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};

export const sendSuccessPasswordChanged = async (email: string) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: 'Votre mot de passe a été modifié',
      react: PasswordChanged()
    });
    
    return data;
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: 'Confirmez votre email',
      react: EmailVerification({token})
    });
    
    return data;
    
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};

export const sendSuccessEmailVerified = async (email: string) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: 'Votre adresse e-mail a été vérifiée',
      react: EmailVerified()
    });
    
    return data;
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};