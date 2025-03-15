"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Stripe from "stripe";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getUserInvoices } from "@/actions/order";
import { PulseLoader } from "react-spinners";

interface OrdersListProps {
  initialInvoices: Stripe.Invoice[];
}
export default function OrdersList({initialInvoices}: OrdersListProps) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

   // Fonction pour charger plus de factures
   const loadMoreInvoices = useCallback(async () => {
    if (isFetching || !hasMore || invoices.length > 20) return;

    setIsFetching(true);
    const lastInvoiceId = invoices[invoices.length - 1]?.id;

    try {
      const res = await fetch(`/api/invoices?lastInvoiceId=${lastInvoiceId}`);
      const newInvoices = await res.json();
  
      setInvoices((prev) => [...prev, ...newInvoices]);
  
      // Si on reçoit moins de 20 factures, c'est qu'il n'y en a plus
      if (newInvoices.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des factures :", error);
    }

    setIsFetching(false);
  }, [isFetching, hasMore, invoices]);

  // Déclenchement du chargement lorsque `inView` est `true`
  useEffect(() => {
    if (inView) {
      loadMoreInvoices();
    }
  }, [inView, loadMoreInvoices]);

  return (
    <div>
      {invoices?.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-200">
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-gray-200">
                <TableCell>{new Date(invoice.created * 1000).toLocaleDateString()}</TableCell>
                <TableCell>{(invoice.amount_due / 100).toFixed(2)} {invoice.currency.toUpperCase()}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  {invoice.invoice_pdf ? (
                    <Link href={invoice.invoice_pdf ?? ""} target="_blank" rel="noopener noreferrer" className="underline">
                    Télécharger
                    </Link>
                  ) : (
                    <p>
                      Non disponible
                    </p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    {hasMore && 
      <div ref={ref} className="flex justify-center mt-4">
          <PulseLoader
            size={7}
            color="white"
            />
      </div>
    }

    </div>
  );
}
