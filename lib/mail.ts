import AccountDeleted from "@/emails/AccountDeleted";
import EmailChangeConfirmation from "@/emails/EmailChangeConfirmation";
import EmailChanged from "@/emails/EmailChanged";
import EmailDeleteAccountConfirmation from "@/emails/EmailDeleteAccountConfirmation";
import EmailVerification from "@/emails/EmailVerification";
import EmailVerified from "@/emails/EmailVerified";
import NewCodes from "@/emails/NewCodes";
import PasswordChanged from "@/emails/PasswordChanged";
import ResetPassword from "@/emails/ResetPassword";
import SuccessPurchase from "@/emails/SuccessPurchase";
import TwoFactorEmail from "@/emails/TwoFactorEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendSuccessPurchase = async (email: string, name: string) => {
  try {
    const data = await resend.emails.send({
      from: "EcomCodeHub <notifications@ecomcodehub.com>",
      to: `${email}`,
      subject: "Thank you for your purchase",
      react: SuccessPurchase({ name }),
    });

    return data;
  } catch (error) {
    throw new Error("Email sending failed");
  }
};

export const sendNotificationNewCodes = async (
  codeCount: number,
  emails: (string | null)[]
) => {
  try {
    const data = await resend.emails.send({
      from: "EcomCodeHub <notifications@ecomcodehub.com>",
      to: `${emails}`,
      subject: `${codeCount} nouveaux codes disponibles sur EcomCodeHub !`,
      react: NewCodes({ codeCount }),
    });

    return data;
  } catch (error) {
    throw new Error("Email sending failed");
  }
};
