"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function PaymentErrorModal() {
  const searchParams = useSearchParams();
  const paymentError = searchParams.get("echec") || searchParams.get("cancel");
  const t = useTranslations("fe");

  const [isPaymentError, setIsPaymentError] = useState(false);

  // Quand paymentError est présent dans l'URL, on ouvre le modal
  useEffect(() => {
    if (paymentError) {
      setIsPaymentError(true);
    }
  }, [paymentError]);

  return (
    <Dialog open={isPaymentError} onOpenChange={setIsPaymentError}>
      <DialogContent className="max-w-sm p-0 border-none shadow-none">
        <Card className="shadow-md">
          <CardHeader className="text-center space-y-4 mx-auto flex flex-col justify-center items-center">
              <AlertCircle className="size-28 text-destructive" />
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-foreground text-center">
                {t("paymentErrorModal.title")}
              </h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground text-center">
              {t("paymentErrorModal.mainMessage")}
            </p>
            <p className="text-sm text-destructive text-center mt-4">
              {t("paymentErrorModal.retryAdvice")}
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
