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
  const [hasVerified, setHasVerified] = useState(false);

  const searchParams = useSearchParams();
  
  const token = searchParams?.get("token");

  useEffect(() => {
    if (!token) {
      setMessage({ type: 'warning', key: 'tokenRequired' });
      setIsLoading(false);
      return;
    }

    if (hasVerified) {
      // On a déjà vérifié pour ce token, ne rien faire
      return;
    }

    const onSubmit = async () => {
      try {
        setIsLoading(true);
        const data = await newVerification({ token });
        const res = data?.data;

        if (res?.error) {
          setMessage({ type: 'error', key: res.error });
        } else if (res?.success) {
          setMessage({ type: 'success', key: res.success });
        } else {
          setMessage({ type: 'error', key: 'somethingWentWrong' });
        }
      } catch {
        setMessage({ type: 'error', key: 'somethingWentWrong' });
      } finally {
        setIsLoading(false);
        setHasVerified(true); // on indique qu'on a fait la vérification
      }
    };

    onSubmit();
  }, [token, hasVerified]);

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