"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { XCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useVisibleFloatingCartStore } from "@/store/cart";
import { usePaymentModalStore } from "@/store/payment-modal";

export function PaymentErrorModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentError = searchParams.get("echec") || searchParams.get("cancel");
  const t = useTranslations("fe");

  const { setIsVisible } = useVisibleFloatingCartStore();
  const { setIsPaymentModalOpen } = usePaymentModalStore();
  const [isPaymentError, setIsPaymentError] = useState(false);

  useEffect(() => {
    if (paymentError) {
      setIsPaymentError(true);
      setIsVisible(false);
      setIsPaymentModalOpen(true);
    }
  }, [paymentError, setIsVisible, setIsPaymentModalOpen]);

  const handleClose = () => {
    setIsPaymentError(false);
    // Nettoyer l'URL
    router.push(window.location.pathname);
    setIsVisible(true);
    setIsPaymentModalOpen(false);
  };

  const handleRetry = () => {
    setIsPaymentError(false);
    setIsPaymentModalOpen(false);
    // Scroll vers le bouton Add to Cart
    const addToCartButton = document.querySelector("[data-add-to-cart]");
    addToCartButton?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const isCancel = searchParams.get("cancel") === "true";

  return (
    <Dialog open={isPaymentError} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 border-none shadow-none">
        <Card className="shadow-2xl border-red-200 dark:border-red-900/50">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              {isCancel ? (
                <AlertTriangle className="size-12 text-orange-600 dark:text-orange-400" />
              ) : (
                <XCircle className="size-12 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">
                {isCancel
                  ? t("paymentErrorModal.cancelTitle")
                  : t("paymentErrorModal.errorTitle")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isCancel
                  ? t("paymentErrorModal.cancelSubtitle")
                  : t("paymentErrorModal.errorSubtitle")}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pb-6">
            {/* Message principal */}
            <div className="space-y-3">
              <p className="text-sm text-foreground text-center">
                {isCancel
                  ? t("paymentErrorModal.cancelMessage")
                  : t("paymentErrorModal.errorMessage")}
              </p>

              {!isCancel && (
                <div className="bg-secondary/30 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-red-800 dark:text-red-300">
                    <strong>{t("paymentErrorModal.commonIssuesTitle")}</strong>
                  </p>
                  <ul className="text-xs text-red-700 dark:text-red-400 mt-2 space-y-1 list-disc list-inside">
                    <li>{t("paymentErrorModal.issue1")}</li>
                    <li>{t("paymentErrorModal.issue2")}</li>
                    <li>{t("paymentErrorModal.issue3")}</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleRetry}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
              >
                <RefreshCw className="size-4 mr-2" />
                {t("paymentErrorModal.retryButton")}
              </Button>

              <Button
                onClick={handleClose}
                size="lg"
                variant="outline"
                className="w-full"
              >
                {t("paymentErrorModal.closeButton")}
              </Button>
            </div>

            {/* Support */}
            <div className="text-center pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                {t("paymentErrorModal.needHelp")}{" "}
                <a
                  href="mailto:slmrsv.bz@gmail.com"
                  className="text-primary hover:underline font-medium"
                >
                  {t("paymentErrorModal.contactSupport")}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
