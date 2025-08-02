"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,  
} from "@/components/ui/form";
import React, { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { CiLock } from 'react-icons/ci';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteAccountSchema } from '@/schemas';
import { toast } from 'sonner';
import { deleteAccount } from '@/actions/account';
import { Dialog, DialogContent } from '../ui/dialog';
import { DeleteAccount } from '@/types/types';
import { Button } from '../ui/button';
import CardAuthWrapper from '../card/CardAuthWrapper';
import { Input } from '../ui/input';
import { PulseLoader } from 'react-spinners';
import { logout } from "@/actions/logout";
import { useLocale, useTranslations } from "next-intl";

const DeleteAccountForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const t = useTranslations("fe");
    const locale = useLocale();

    const form = useForm<DeleteAccount>({
        resolver: zodResolver(deleteAccountSchema),
        defaultValues: {
            password: "",
        },
    });

    const handleClickShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); 
    setShowPassword(!showPassword);
    };

    const onSubmit = (values: DeleteAccount) => {
        startTransition(async () => {
        deleteAccount(values)
            .then((response) => {
                if(response?.data?.error) {
                    toast.error(t(`toast.errors.${response?.data?.error}`));
                }
                if (response?.data?.success) {
                    toast.success(t(`toast.success.${response?.data?.success}`));
                } 
            }).finally(() => {
                 setTimeout(async () => {
                    await logout();
                    window.location.href = `/${locale}`;
                }, 2000);
            });
            });
        };

    return (
        <>
            <div className={cn("space-y-6 max-w-xl")}>
                <h3 className={cn('text-xl font-bold pb-2')}>{t("form.deleteTitle")}</h3>
                <p className={cn('pb-2 whitespace-pre-wrap')}>
                    {t("form.deleteDescription")}
                </p>
                <Button
                    size="lg"
                    variant="link"
                    className="px-0 font-bold text-red-500 underline"
                    onClick={() => setIsModalOpen(true)}
                >
                    {t("form.deleteButton")}
                </Button>
            </div>
            {isModalOpen && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="min-h-auto md:h-auto max-w-sm p-6 rounded-2xl lg:max-w-lg">
                    <div className='w-full text-left -mt-3 text-base font-medium'>{t("form.deleteModalTitle")}</div>
                        <CardAuthWrapper
                            title={t("form.deleteModalConfirmTitle")}
                            description={t("form.deleteModalConfirmDescription")}
                            onClick={() => setIsModalOpen(false)}
                            footerHref={`/${locale}/auth/reset`}
                            footerLabel={t("form.forgotPassword")}
                            className="border-none shadow-none"
                        >
                            <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
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
                                            placeholder={t("form.deletePlaceholder")}
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
                                <Button
                                size="xl" 
                                className={cn("w-full font-medium mt-2 text-white", "lg:text-base")}
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
                        </CardAuthWrapper>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default DeleteAccountForm;