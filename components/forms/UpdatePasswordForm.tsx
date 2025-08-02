"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { updatePasswordSchema } from '@/schemas';
import { UpdatePassword } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "../ui/input";
import { CiLock } from "react-icons/ci";
import { Button } from "../ui/button";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import { toast } from "sonner";
import { updatePassword } from "@/actions/account";
import { useTranslations } from "next-intl";

const UpdatePasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const t = useTranslations("fe");

    const form = useForm<UpdatePassword>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    });

    const onSubmit = (values: UpdatePassword) => {
        startTransition(() => {
            updatePassword({
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
            })
            .then((data) => {
                if(data?.data?.success) {
                toast.success(data?.data?.success);
                } else {
                toast.error(data?.data?.error);
                }
            })
            .catch(() => {
                toast.error(t("toast.errors.somethingWrong"));
            }).finally(() => {
            })
        });
    };
    
    const handleClickShowNewPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation(); 
        setShowNewPassword(!showNewPassword);
    };

    const handleClickShowConfirmPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation(); 
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-xl"
            >
                <h3 className={cn('text-xl font-bold pb-2')}>{t("form.passwordPlaceholder")}</h3>
                <div className={cn("flex flex-col items-center gap-6", "lg:flex-row lg:gap-4")}>
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className="space-y-4 w-full">
                                <FormLabel className="font-medium">{t("form.updatePasswordNewLabel")}</FormLabel>
                                <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                icon={<CiLock className="text-lg opacity-80" />} 
                                placeholder="Mot de passe"
                                type={showNewPassword ? "text" : "password"}
                                endIcon={
                                    <Button type="button" variant="link" onClick={handleClickShowNewPassword}>
                                    {showNewPassword ? <IoEyeOutline className="text-black h-5 w-5" /> : <IoEyeOffOutline className="text-black h-5 w-5" />}
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
                            <FormItem className="space-y-4 w-full">
                                <FormLabel className="font-medium">{t("form.updatePasswordConfirmLabel")}</FormLabel>
                                <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                icon={<CiLock className="text-lg opacity-80" />} 
                                placeholder={t("form.passwordPlaceholder")}
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
                <div>
                    <Link href="/auth/reset" className="text-sm underline font-bold">{t("form.forgotPassword")}</Link>
                </div>
                <Button
                    size="lg" 
                    className={cn("font-medium mt-2 text-white", "lg:text-base")}
                    disabled={isPending}
                    type="submit"
                >
                    {isPending ? (
                    <PulseLoader
                        size={7}
                        color="white"
                    />) : (
                        t("form.confirm")
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default UpdatePasswordForm;