"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema, NewPasswordTokenSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,  
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { GetAPiMesssage } from "../GetAPiMesssage";
import { NewPassword } from "@/types/types";
import PasswordContent from "../content/auth/PasswordContent";
import CardAuthWrapper from "../card/CardAuthWrapper";
import { newPassword, newVerificationPasswordtoken } from "@/actions/new-password";

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: string, key: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
    
  const form = useForm<NewPassword>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
  });

  const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); 
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); 
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  useEffect(() => {    
    if (!token) {
      setMessage({ type: 'warning', key: 'tokenInvalid' });
      return;
    }

    const validateToken = async () => {
      newVerificationPasswordtoken({ token })
        .then((data) => {
          if(data?.data?.success) {
            toast.success(data?.data?.success);
          } else {
            setMessage({ type: 'error', key: data?.data?.error ?? "" });
          }
        })
        .catch(() => {
          setMessage({ type: 'error', key: 'server' });
        }).finally(() => {
        })
    };

    validateToken();
  }, [token]);
  
  const onSubmit = (values: NewPassword) => {

    if (!token) {
      setMessage({ type: 'warning', key: 'tokenInvalid' });
      return;
    }

    startTransition(() => {
      newPassword({
        password: values.password,
        confirmPassword: values.confirmPassword,
        token
      })
        .then((data) => {
          if(data?.data?.success) {
            setMessage({ type: 'success', key: data?.data?.success ?? "" });
          } else {
            setMessage({ type: 'error', key: data?.data?.error ?? "" });
          }
        })
        .catch(() => {
          setMessage({ type: 'error', key: 'server' });
        }).finally(() => {
        })
    });
  };

  const messageContent = PasswordContent(message?.key);


  return (
    <div className={cn("bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6", "lg:px-10", "xl:px-20", "dark:bg-[#324e58]")}>
        <CardAuthWrapper
           title="Mise à jour du mot de passe"
        >
          {!message ? (
            <>
              <p className="pb-10 text-center">Pour réinitialiser votre mot de passe, veuillez entrer un nouveau mot de passe dans les champs ci-dessous.</p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
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
                              placeholder="Mot de passe"
                              type={showPassword ? "text" : "password"}
                              endIcon={
                                <Button type="button" variant="link" onClick={handleClickShowPassword}>
                                  {showPassword ? <IoEyeOutline className="text-black h-5 w-5" /> : <IoEyeOffOutline className="text-black h-5 w-5" />}
                                </Button>
                              } 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              icon={<CiLock className="text-lg opacity-80" />} 
                              placeholder="Confirmation"
                              type={showConfirmPassword ? "text" : "password"}
                              endIcon={
                                <Button type="button" variant="link" onClick={handleClickShowConfirmPassword}>
                                  {showConfirmPassword ? <IoEyeOutline className="text-black h-5 w-5" /> : <IoEyeOffOutline className="text-black h-5 w-5" />}
                                </Button>
                              } 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button 
                    size="xl" 
                    className={cn("w-full font-medium mt-2", "lg:text-base")}
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending ? (
                      <PulseLoader
                        size={7}
                        color="white"
                      />) : (
                      "Confirmer"
                    )}
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <GetAPiMesssage {...messageContent} />
          )}
        </CardAuthWrapper>
    </div>
  );
};

export default NewPasswordForm;