"use client";
import { cn } from '@/lib/utils';
import React, { FC, useTransition } from 'react';
import { Switch } from '../ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,  
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notificationSchema } from '@/schemas';
import { Notifications, UserType } from '@/types/types';
import { toggleEmailNotifications } from '@/actions/notification';
import { toast } from 'sonner';

interface EmailNotificationsFormProps {
    user: UserType;
}

const EmailNotificationsForm: FC<EmailNotificationsFormProps> = ({ user }) => {
    const [isPending, startTransition] = useTransition();
      
    const form = useForm<Notifications>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            emailNotifications: user?.emailNotifications ?? false, // ✅ Correction ici
        },
    });

    const onSubmit = (values: Notifications) => {
        startTransition(async () => {
            console.log(values);
            toggleEmailNotifications(values)
                .then((response) => {
                    if(response?.data?.error) {
                        toast.error(response?.data?.error);
                    }
                    if (response?.data?.success) {
                        toast.success(response?.data?.success);
                    } 
                });
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between"> 
                <div className="py-2 space-y-1 lg:py-4"> 
                    <h4 className="text-sm font-semibold lg:text-lg">Email Communication</h4>
                    <p className="text-sm font-medium text-foreground/50 lg:text-base">
                        Recevez des emails quand de nouveaux codes sont ajoutés
                    </p>
                </div>
                <FormField 
                    control={form.control} 
                    name="emailNotifications" // ✅ Correction ici
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Switch
                                    className="dark:b-[#2c4049]"
                                    checked={field.value}
                                    onCheckedChange={(checked) => { 
                                        field.onChange(checked); 
                                        onSubmit({ emailNotifications: checked }); // ✅ Appel direct ici
                                    }}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default EmailNotificationsForm;
