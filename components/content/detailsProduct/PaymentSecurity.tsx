import { cn } from '@/lib/utils';
import React from 'react';

const PaymentSecurity = () => {
  return (
    <ul className={cn("text-sm space-y-6 py-4")}>
      <li>
        <strong className='underline'>Paiement 100% sécurisé :</strong> Toutes les transactions sont sécurisées via Stripe et ses partenaires officiels comme Apple Pay, Google Pay, Revolut, PayPal, Amazon Pay, Link ou Twint.
      </li>
      <li>
        <strong className='underline'>Moyens de paiement disponibles :</strong> Visa, Mastercard, Apple Pay, Google Pay, Revolut, Link, Paypal, Twint, Bancontact, Amazon Pay.
      </li>
      <li>
        <strong className='underline'>Besoin d’une preuve ?</strong> Stripe est certifié PCI DSS niveau 1, la norme la plus stricte en matière de sécurité des paiements.
      </li>
    </ul>
  );
};

export default PaymentSecurity;
