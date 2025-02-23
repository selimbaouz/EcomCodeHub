"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CiMail } from "react-icons/ci";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { GetAPiMesssage } from "../GetAPiMesssage";
import { Reset } from "@/types/types";
import CardAuthWrapper from "../card/CardAuthWrapper";
import ResetContent from "../content/auth/ResetContent";
import { reset } from "@/actions/reset";

export function ResetForm() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<Reset>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: Reset) => {
    startTransition(() => {
      reset(values)
        .then((data) => {
          if(data?.data?.success) {
            setIsSuccess(true);
            toast.success(data?.data?.success);
          } else {
            toast.error(data?.data?.error);
          }
        });
    });
  };
  
  return (
    <div className={cn("bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6", "lg:px-10", "xl:px-20", "dark:bg-[#324e58]")}>
      {isSuccess ? (
        <CardAuthWrapper>
          <GetAPiMesssage {...ResetContent()} />
        </CardAuthWrapper>
      ) : (
        <CardAuthWrapper
          title="Mot de passe oublié ?">
          <p className="pb-10 text-center">Veuillez entrer l'adresse e-mail associée à votre compte. Un lien pour réinitialiser votre mot de passe vous sera envoyé par e-mail.</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
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
                  "Envoyer"
                )}
              </Button>
            </form>
          </Form>
        </CardAuthWrapper>
      )}
    </div>
  );
}