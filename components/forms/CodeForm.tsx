"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,  
} from "@/components/ui/form";
import { useState, useTransition} from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { CiMail, CiLock } from "react-icons/ci";
import { CodePromoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { Code } from "@/types/types";
import CardAuthWrapper from "../card/CardAuthWrapper";
import { createUserWithPromo, validateCodeWithIP } from "@/actions/promo-code";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hook/use-current-user";

export function CodeForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [promoId, setPromoId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition();
  const currentUser = useCurrentUser();
  
  const form = useForm<Code>({
    resolver: zodResolver(CodePromoSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
      name: ""
    },
  });

  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); 
    setShowPassword(!showPassword);
  };
  
const onSubmit = (values: Code) => {
    if (!isSignup) {
        startTransition(async () => {
          validateCodeWithIP({code: values.code}).then((response) => {
            if (response?.data?.error) {
              toast.error(response?.data?.error);
            } else {
                setPromoId(response?.data?.promoId ?? "");
                setIsSignup(true);
            }
          });
        });
        return;
    } else {
        startTransition(async () => {
          createUserWithPromo({
            name: values.name ?? "",
            email: values.email ?? "",
            password: values.password ?? "",
            promoId: promoId ?? "",
          }).then((response) => {
            if (response?.data?.error) {
              toast.error(response?.data?.error);
            } 

            redirect('/auth/login');
            setIsSignup(false);
          });
        });
        return;
      }
};  

  const cardTexts = !isSignup ?
    {
        title: "Débloquez vos crédits offerts",
        description: "Vous avez reçu une invitation spéciale ?\nEntrez-le ci-dessous pour activer vos crédits.",
    } : 
    {
        title: "Créez votre compte",
        description: "Entrez votre adresse email et créez un mot de passe pour accéder à votre compte.",
    };

  if(currentUser) {
    redirect("/docs");
  }
  
  return (
    <div className={cn("bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6", "lg:px-10", "xl:px-20", "dark:bg-[#324e58]")}>
      <CardAuthWrapper
        title={cardTexts.title}
        description={cardTexts.description}
        footerTitle="Vous avez un compte ?"
        footerLabel="Connectez-vous"
        footerHref="/auth/login"
        className="whitespace-pre-wrap"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {!isSignup && (
              <FormField
              control={form.control}
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
            )}
            {isSignup && (
              <>
              <FormField
              control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                            <Button type="button" variant="link" onClick={handleClickShowPassword}>
                              {showPassword ? <IoEyeOutline className="text-foreground h-5 w-5" /> : <IoEyeOffOutline className="text-foreground h-5 w-5" />}
                            </Button>
                          } 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </>
            )}
            <Button 
              size="xl" 
              className={cn("w-full font-medium mt-2 text-white", "lg:text-base")}
              disabled={isPending}
              type="submit"
              onClick={() => onSubmit(form.getValues())}
            >
              {isPending ? (
                <PulseLoader
                  size={7}
                  color="white"
                />) : (
                isSignup ? "S'inscrire" : "Confirmer"
              )}
            </Button>
          </form>
        </Form>
      </CardAuthWrapper>
    </div>
  );
}