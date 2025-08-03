"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CardAuthWrapper from '../card/CardAuthWrapper';
import { GetAPiMesssage } from '../GetAPiMesssage';
import { cn } from '@/lib/utils';
import { updateEmail } from '@/actions/account';
import { useNewEmailStore } from '@/store/account';
import { EmailChangeConfirmationContent } from '../content/auth/EmailChangeConfirmationContent';
import { logout } from '@/actions/logout';
import { PulseLoader } from 'react-spinners';
import { useLocale, useTranslations } from 'next-intl';
import z from 'zod';

const EmailChangeConfirmation = () => {
  const [message, setMessage] = useState<{ type: string, key: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {newEmail} = useNewEmailStore();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const token = searchParams?.get("token");
  const t = useTranslations("fe");

  const NewVerificationEmailSchema = z.object({
    newEmail: z.string().email(t("schemas.updateEmailEmailInvalid")),
    token: z.string(),
  });

  useEffect(() => {
    if (!token) {
      setMessage({ type: 'warning', key: 'tokenRequired' });
      setIsLoading(false);
      return;
    }

    const parsedToken = NewVerificationEmailSchema.safeParse({ newEmail, token });

    if (!parsedToken.success) {
      setMessage({ type: 'warning', key: 'tokenInvalid' });
      setIsLoading(false);
      return;
    }

    const onSubmit = async () => {
        updateEmail({ newEmail, token })
        .then((data) => {
          if(data?.data?.success) {
            setMessage({ type: 'success', key: data?.data?.success ?? "" });

            setTimeout(async () => {
              await logout();
              window.location.href = `/${locale}/auth/login`;
            }, 2000);

          } else {
            setMessage({ type: 'error', key: data?.data?.error ?? "" });
          }
        })
        .catch(() => {
          setMessage({ type: 'error', key: 'somethingWentWrong' });
        }).finally(() => {
          setIsLoading(false);
        });
    };

    onSubmit();
  }, [newEmail, token]);

  const messageContent = EmailChangeConfirmationContent(message?.key, locale, t);

  return (
    <div className={cn("bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6", "lg:px-10", "xl:px-20", "dark:bg-[#324e58]")}>
      <CardAuthWrapper>
         {isLoading ? (
               <div className="flex flex-col items-center justify-center py-12">
                 <PulseLoader size={14} color="#0ea5e9" />
               </div>
             ) : (
               <GetAPiMesssage {...messageContent} />
             )}
      </CardAuthWrapper>
    </div>
  );
};

export default EmailChangeConfirmation;