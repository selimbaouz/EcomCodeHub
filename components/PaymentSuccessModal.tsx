"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, Clock, ArrowRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useVisibleFloatingCartStore } from "@/store/cart";
import { usePaymentModalStore } from "@/store/payment-modal";

export function PaymentSuccessModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentSuccess = searchParams.get("success");
  const t = useTranslations("fe");

  const { setIsVisible } = useVisibleFloatingCartStore();
  const { setIsPaymentModalOpen } = usePaymentModalStore();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  useEffect(() => {
    if (paymentSuccess === "true") {
      setIsPaymentSuccess(true);
      setIsVisible(false);
      setIsPaymentModalOpen(true);
    }
  }, [paymentSuccess, setIsVisible, setIsPaymentModalOpen]);

  const handleClose = () => {
    setIsPaymentSuccess(false);
    // Nettoyer l'URL
    router.push(window.location.pathname);
    setIsVisible(true);
    setIsPaymentModalOpen(false);
  };

  return (
    <Dialog open={isPaymentSuccess} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 border-none shadow-none rounded-xl">
        <Card className="shadow-2xl border-primary/20">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="size-12 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">
                {t("paymentSuccessModal.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("paymentSuccessModal.subtitle")}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pb-6">
            {/* Étapes à suivre */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <ArrowRight className="size-4 text-primary" />
                {t("paymentSuccessModal.nextSteps")}
              </h4>

              {/* Étape 1 : Email */}
              <div className="flex gap-3 p-3 bg-background rounded-lg border border-secondary/30">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center">
                    <Mail className="size-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {t("paymentSuccessModal.step1Title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("paymentSuccessModal.step1Description")}
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-500 font-medium mt-1">
                    ⚠️ {t("paymentSuccessModal.checkSpam")}
                  </p>
                </div>
              </div>

              {/* Étape 2 : Notion */}
              <div className="flex gap-3 p-3 bg-background rounded-lg border border-secondary/30">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center text-lg">
                    📝
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {t("paymentSuccessModal.step2Title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("paymentSuccessModal.step2Description")}
                  </p>
                </div>
              </div>

              {/* Étape 3 : Validation */}
              <div className="flex gap-3 p-3 bg-background rounded-lg border border-secondary/30">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center">
                    <Clock className="size-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {t("paymentSuccessModal.step3Title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("paymentSuccessModal.step3Description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Note importante */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs text-green-800">
                💡 {t("paymentSuccessModal.importantNote")}
              </p>
            </div>

            {/* Bouton de fermeture */}
            <Button
              onClick={handleClose}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
            >
              {t("paymentSuccessModal.closeButton")}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
