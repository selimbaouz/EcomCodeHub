"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,  
} from "@/components/ui/form";
import { useState, useTransition, MouseEventHandler, useEffect} from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { CiMail, CiLock } from "react-icons/ci";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { Login } from "@/types/types";
import CardAuthWrapper from "../card/CardAuthWrapper";
import { useCurrentUser } from "@/hook/use-current-user";
import { redirect } from "next/navigation";
import { updateOrLogin, verifyEmail } from "@/actions/login";
import { IoIosMail } from "react-icons/io";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [isMailSended, setIsMailSended] = useState(false);
  const [mailOfUser, setMailOfUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, startTransition] = useTransition();
  const user = useCurrentUser();
  
  if(user) {
    redirect("/");
  }
  
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: ""
    },
  });

  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); 
    setShowPassword(!showPassword);
  };
  
  const onSubmit = (values: Login) => {
    setIsLoading(true);
    startTransition(async () => {
      verifyEmail(values)
        .then((response) => {
          if(response?.data?.error) {
            toast.error(response?.data?.error);
          }
          if (response?.data?.success) {
            if(!emailChecked) {
              if (response?.data?.user?.stripeCustomerId && response.data?.user.plan && response?.data?.user.email) {
                if(response.data?.user?.emailVerified && !response.data?.mailsend) {
                  setEmailChecked(true);
                } else {
                  toast.success(response?.data?.success);
                  setIsMailSended(true);
                  setMailOfUser(values.email);
                }
              } else {
                toast.error("Votre email n'existe pas !", {
                  description: "Veuillez acheter un plan pour pouvoir utiliser votre compte."
                })
              }
            }  else {
              setIsLogin(!!response?.data?.user?.password);
            } 
          } 
        });
      });
    setIsLoading(false);
  };

  const handleUpdateOrLogin = (values: Login) => {
    startTransition(async () => {
      updateOrLogin(values)
      .then((response) => {
        toast.error(response?.data?.error);
        toast.success(response?.data?.success);
      });
    });
  };

  const cardTexts = !emailChecked
    ? {
        title: "Bienvenue",
        description:
          "Veuillez entrer l'email que vous avez utilisé lors de votre achat sur Stripe.",
      }
    : isLogin
    ? {
        title: "Connectez-vous avec votre mot de passe",
        description:
          "Veuillez indiquer le mot de passe que vous avez créé lors de votre inscription.",
      }
    : {
        title: "Créer un nouveau mot de passe",
        description:
          "Veuillez créer un nouveau mot de passe pour accéder à votre compte.",
      };

  if(!emailChecked && isMailSended) {
    return (
      <div className={cn("bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6", "lg:px-10", "xl:px-20", "dark:bg-[#324e58]")}>
        <div className={cn("flex flex-col h-full gap-1 items-center justify-center text-center")}>
          <IoIosMail className={cn("text-6xl")} />
          <h5>Vérifiez votre Email</h5>
          <p>Nous envoyons simplement un lien de vérification à {mailOfUser || form.getValues("email")}.</p>
          <Button 
              size="xl" 
              className={cn("w-max font-medium mt-8 text-white", "lg:text-base")}
              type="button"
              onClick={() => setIsMailSended(false)}
            >
              Accéder à la connexion
            </Button>
        </div>
      </div>
    )
  }
  return (
    <div className={cn("bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6", "lg:px-10", "xl:px-20", "dark:bg-[#324e58]")}>
      <CardAuthWrapper
        title={cardTexts.title}
        description={cardTexts.description}
        footerTitle={"Vous n'avez pas de compte ?"}
        footerLabel={"Commandez un pack"}
        footerHref={`/products/pack-pro-conversion-shopify`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(!emailChecked ?  onSubmit : handleUpdateOrLogin)}
            className="space-y-6"
          >
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Code à deux facteurs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && emailChecked && !isLogin && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        icon={<CiLock className="text-lg opacity-80" />} 
                        placeholder="Créer un nouveau mot de passe"
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
            )}
            {!showTwoFactor && !emailChecked && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        icon={<CiMail className="text-lg opacity-80" />}
                        placeholder="Adresse e-mail"
                        type="email"
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && emailChecked && isLogin && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
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
                          disabled={isLoading}
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
                      {isLogin && (
                        <Button
                          size="sm"
                          variant="link"
                          className="px-0 pt-2 font-normal text-foreground"
                          asChild
                        >
                          <Link href="/auth/reset" className="pb-2 text-sm">Mot de passe oublié ?</Link>
                        </Button>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </>
            )}
            <Button 
              size="xl" 
              className={cn("w-full font-medium mt-2 text-white", "lg:text-base")}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <PulseLoader
                  size={7}
                  color="white"
                />) : (
                showTwoFactor ? "Confirmer" : isLogin ? "Se connecter" : "Continuer"
              )}
            </Button>
          </form>
        </Form>
      </CardAuthWrapper>
    </div>
  );
}