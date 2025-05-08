"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function PaymentErrorModal() {
  const searchParams = useSearchParams();
  const paymentError = searchParams.get("echec") || searchParams.get("cancel");

  return (
    <Dialog open={!!paymentError}>
      <DialogContent className="max-w-sm p-0 border-none shadow-none">
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <h3 className="text-lg font-semibold text-destructive">
                Échec du paiement
              </h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">
              Une erreur est survenue lors du traitement de votre paiement.
            </p>
            <p className="text-sm text-destructive mt-2">
              Veuillez réessayer ou contacter votre banque si le problème persiste.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
