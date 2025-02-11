'use client';

import { CartItem } from '@/types/types';
import clsx from 'clsx';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useFormState } from 'react-dom';
import { updateItemQuantity } from './actions';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  return (
    <button
      type="submit"
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 dark:hover:bg-primary',
        {
          'ml-auto border-r dark:border-gray-200/10': type === 'minus',
          'border-l dark:border-gray-200/10': type === 'plus'
        }
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="size-3 text-foreground" />
      ) : (
        <MinusIcon className="size-3 text-foreground" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optimisticUpdate: any;
}) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form
      action={async () => {
        optimisticUpdate(payload.merchandiseId, type);
        await actionWithVariant();
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
