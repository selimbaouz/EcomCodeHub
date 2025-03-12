"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { FC, useTransition} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateEmail } from "@/types/types";
import { updateEmailSchema } from "@/schemas";
import { confirmChangeEmail } from "@/actions/account";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { PulseLoader } from "react-spinners";
import { Input } from "../ui/input";
import { CiMail } from "react-icons/ci";
import { useNewEmailStore } from "@/store/account";
import { User } from "next-auth";

interface UpdateEmailFormProps {
    currentUser: User;
}
const UpdateEmailForm:FC<UpdateEmailFormProps> = ({currentUser}) => {
    const [isPending, startTransition] = useTransition();
    const {setNewEmail} = useNewEmailStore();

    const form = useForm<UpdateEmail>({
        resolver: zodResolver(updateEmailSchema),
        defaultValues: {
          newEmail: currentUser.email ?? "",
        },
      });

    const onSubmit = (values: UpdateEmail) => {
        startTransition(async () => {
        confirmChangeEmail(values)
            .then((response) => {
            if(response?.data?.error) {
                toast.error(response?.data?.error);
            } else if (response?.data?.success) {
                setNewEmail(values.newEmail);
            }
            });
        });
    };

    return (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-xl"
            >
                <h3 className={cn('text-xl font-bold pb-2')}>Email</h3>
                <FormField
                    control={form.control}
                    name="newEmail"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                            <FormLabel className="font-medium">Adresse Email</FormLabel>
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
                "Sauvegarder"
                )}
            </Button>
            </form>
        </Form>
    );
};

export default UpdateEmailForm;