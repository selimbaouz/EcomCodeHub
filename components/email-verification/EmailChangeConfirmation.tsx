"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { NewVerificationEmailSchema } from '@/schemas';
import CardAuthWrapper from '../card/CardAuthWrapper';
import { GetAPiMesssage } from '../GetAPiMesssage';
import { cn } from '@/lib/utils';
import { updateEmail } from '@/actions/account';
import { useNewEmailStore } from '@/store/account';
import { EmailChangeConfirmationContent } from '../content/auth/EmailChangeConfirmationContent';
import { logout } from '@/actions/logout';

const EmailChangeConfirmation = () => {
  const [message, setMessage] = useState<{ type: string, key: string } | null>(null);
  const {newEmail} = useNewEmailStore();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    if (!token) {
      setMessage({ type: 'warning', key: 'tokenRequired' });
      return;
    }

    const parsedToken = NewVerificationEmailSchema.safeParse({ newEmail, token });

    if (!parsedToken.success) {
      setMessage({ type: 'warning', key: 'tokenInvalid' });
      return;
    }

    const onSubmit = async () => {
        updateEmail({ newEmail, token })
        .then((data) => {
          if(data?.data?.success) {
            setMessage({ type: 'success', key: data?.data?.success ?? "" });

            setTimeout(async () => {
              await logout();
              window.location.href = "/auth/login";
            }, 2000);

          } else {
            setMessage({ type: 'error', key: data?.data?.error ?? "" });
          }
        })
        .catch(() => {
          setMessage({ type: 'error', key: 'somethingWentWrong' });
        });
    };

    onSubmit();
  }, [newEmail, token]);

  const messageContent = EmailChangeConfirmationContent(message?.key);

  return (
    <div className={cn("bg-secondary/30 h-[92dvh] w-full flex flex-col items-center px-6", "lg:px-10", "xl:px-20", "dark:bg-[#324e58]")}>
      <CardAuthWrapper>
        <GetAPiMesssage {...messageContent} />
      </CardAuthWrapper>
    </div>
  );
};

export default EmailChangeConfirmation;