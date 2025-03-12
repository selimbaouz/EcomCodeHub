import AccountDeleted from "@/emails/AccountDeleted";
import EmailChangeConfirmation from "@/emails/EmailChangeConfirmation";
import EmailChanged from "@/emails/EmailChanged";
import EmailDeleteAccountConfirmation from "@/emails/EmailDeleteAccountConfirmation";
import EmailVerification from "@/emails/EmailVerification";
import EmailVerified from "@/emails/EmailVerified";
import NewCodes from "@/emails/NewCodes";
import PasswordChanged from "@/emails/PasswordChanged";
import ResetPassword from "@/emails/ResetPassword";
import TwoFactorEmail from "@/emails/TwoFactorEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export const sendVerificationEmail = async (email: string, token: string, isChange?: boolean) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: isChange ? 'Confirmez votre nouvelle adresse e-mail' : 'Confirmez votre email',
      react: EmailVerification({token, isChange})
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

export const sendEmailChangeConfirmation = async (email: string, token: string) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: 'Confirmez votre demande de changement de boite mail',
      react: EmailChangeConfirmation({token})
    });
    
    return data;
    
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};

export const sendSuccessEmailChanged = async (email: string) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: 'Votre adresse e-mail a été modifié',
      react: EmailChanged()
    });
    
    return data;
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};

export const sendEmailDeleteAccountConfirmation = async (email: string, token: string) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: 'Confirmez votre demande de suppression de compte',
      react: EmailDeleteAccountConfirmation({token})
    });
    
    return data;
    
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};

export const sendSuccessAccountDeleted = async (email: string) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${email}`,
      subject: 'Votre compte a été supprimé',
      react: AccountDeleted()
    });
    
    return data;
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};

export const sendNotificationNewCodes = async (codeCount: number, emails: (string | null)[]) => {
  try {
    const data = await resend.emails.send({
      from: 'TailwindLiquid <no-reply@tailwindliquid.com>',
      to: `${emails}`,
      subject: `${codeCount} nouveaux codes disponibles sur TailwindLiquid !`,
      react: NewCodes({codeCount})
    });
    
    return data;
  } catch (error) {
    throw new Error("L'envoi d'email a échoué");
  }
};