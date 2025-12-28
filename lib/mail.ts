import SuccessPurchase from "@/emails/SuccessPurchase";
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
