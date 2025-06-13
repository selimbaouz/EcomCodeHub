"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PulseLoader } from "react-spinners";
import { NewVerificationSchema } from '@/schemas';
import { VerificationContent } from '../content/auth/VerificationContent';
import CardAuthWrapper from '../card/CardAuthWrapper';
import { GetAPiMesssage } from '../GetAPiMesssage';
import { newVerification } from '@/actions/new-verification';
import { cn } from '@/lib/utils';

const EmailVerificationRequest = () => {
  const [message, setMessage] = useState<{ type: string, key: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    if (!token) {
      setMessage({ type: 'warning', key: 'tokenRequired' });
      setIsLoading(false);
      return;
    }

    const parsedToken = NewVerificationSchema.safeParse({ token });

    if (!parsedToken.success) {
      setMessage({ type: 'warning', key: 'tokenInvalid' });
      setIsLoading(false);
      return;
    }

    const onSubmit = async () => {
        newVerification({ token })
        .then((data) => {
          if(data?.data?.error) {
            setMessage({ type: 'error', key: data?.data?.error ?? "" });
          } 
          if(data?.data?.success) {
            setMessage({ type: 'success', key: data?.data?.success ?? "" });
          }
        })
        .catch(() => {
          setMessage({ type: 'error', key: 'somethingWentWrong' });
        }).finally(() => {
          setIsLoading(false);
        });
    };

    onSubmit();
  }, [token]);

  const messageContent = VerificationContent(message?.key);

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

export default EmailVerificationRequest;