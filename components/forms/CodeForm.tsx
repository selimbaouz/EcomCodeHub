"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { CiMail, CiLock } from "react-icons/ci";
import { CodePromoSchema, SignUserWithCodeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { Code, SignUpWithCode } from "@/types/types";
import CardAuthWrapper from "../card/CardAuthWrapper";
import {
  createUserWithPromo,
  validateCodeWithIP,
  verifyEmail,
} from "@/actions/promo-code";
import { IoIosMail } from "react-icons/io";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hook/use-current-user";
import Link from "next/link";

export function CodeForm() {
  const [isMailSended, setIsMailSended] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"code" | "signup">("code");
  const [isPending, startTransition] = useTransition();
  const currentUser = useCurrentUser();

  const codeForm = useForm<Code>({
    resolver: zodResolver(CodePromoSchema),
    defaultValues: { code: "" },
  });

  // Formulaire étape 2
  const signupForm = useForm<SignUpWithCode>({
    resolver: zodResolver(SignUserWithCodeSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      promoId: "",
    },
  });

  const handleClickShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const onSubmitCode = (values: Code) => {
    startTransition(async () => {
      const response = await validateCodeWithIP({ code: values.code });
      if (response?.data?.error) {
        toast.error(response?.data?.error);
      } else {
        signupForm.setValue("promoId", response?.data?.promoId ?? "");
        setStep("signup");
      }
    });
  };

  const onSubmitSignup = (values: SignUpWithCode) => {
    startTransition(async () => {
      const response = await createUserWithPromo(values);
      if (response?.data?.error) {
        toast.error(response?.data?.error);
      } else {
        const emailResponse = await verifyEmail(values);
        if (emailResponse?.data?.error) {
          toast.error(emailResponse?.data?.error);
        }
        if (emailResponse?.data?.mailsend) {
          toast.success(emailResponse?.data?.success);
          setIsMailSended(true);
        }
      }
    });
  };

  const cardTexts =
    step === "code"
      ? {
          title: "Débloquez vos crédits offerts",
          description:
            "Vous avez reçu une invitation spéciale ?\nEntrez-le ci-dessous pour activer vos crédits.",
        }
      : {
          title: "Créez votre compte",
          description:
            "Entrez votre adresse email et créez un mot de passe pour accéder à votre compte.",
        };

  if (isMailSended) {
    return (
      <div
        className={cn(
          "bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6",
          "lg:px-10",
          "xl:px-20",
          "dark:bg-[#324e58]",
        )}
      >
        <div
          className={cn(
            "flex flex-col h-full gap-1 items-center justify-center text-center",
          )}
        >
          <IoIosMail className={cn("text-6xl")} />
          <h5>Vérifiez votre Email</h5>
          <p>Un lien de vérification vous a été envoyé par email.</p>
          <Button
            size="xl"
            className={cn("w-max font-medium mt-8", "lg:text-base")}
            type="button"
            onClick={() => setIsMailSended(false)}
            asChild
          >
            <Link href="/auth/login">
              Accéder à la connexion
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (currentUser) {
    redirect("/");
  }

  return (
    <div
      className={cn(
        "bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6",
        "lg:px-10",
        "xl:px-20",
        "dark:bg-[#324e58]",
      )}
    >
      <CardAuthWrapper
        title={cardTexts.title}
        description={cardTexts.description}
        footerTitle="Vous avez un compte ?"
        footerLabel="Connectez-vous"
        footerHref="/auth/login"
        className="whitespace-pre-wrap"
      >
        {step === "code" && (
          <Form {...codeForm}>
            <form
              onSubmit={codeForm.handleSubmit(onSubmitCode)}
              className="space-y-6"
            >
              <FormField
                control={codeForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        icon={<CiMail className="text-lg opacity-80" />}
                        placeholder="Insérez votre code"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size="xl"
                className={cn(
                  "w-full font-medium mt-2 text-white",
                  "lg:text-base",
                )}
                disabled={isPending}
                type="submit"
              >
                {isPending ? (
                  <PulseLoader size={7} color="white" />
                ) : (
                  "Confirmer"
                )}
              </Button>
            </form>
          </Form>
        )}

        {step === "signup" && (
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSubmitSignup)}
              className="space-y-6"
            >
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        icon={<CiMail className="text-lg opacity-80" />}
                        placeholder="Insérez votre nom"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        icon={<CiMail className="text-lg opacity-80" />}
                        placeholder="Adresse e-mail"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        icon={<CiLock className="text-lg opacity-80" />}
                        placeholder={"Mot de passe"}
                        type={showPassword ? "text" : "password"}
                        endIcon={
                          <Button
                            type="button"
                            variant="link"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <IoEyeOutline className="text-foreground h-5 w-5" />
                            ) : (
                              <IoEyeOffOutline className="text-foreground h-5 w-5" />
                            )}
                          </Button>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size="xl"
                className={cn(
                  "w-full font-medium mt-2 text-white",
                  "lg:text-base",
                )}
                disabled={isPending}
                type="submit"
                /* onClick={() => onSubmit(form.getValues())} */
              >
                {isPending ? (
                  <PulseLoader size={7} color="white" />
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardAuthWrapper>
    </div>
  );
}
