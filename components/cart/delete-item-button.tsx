'use client';

import { removeItem } from '@/components/cart/actions';
import { CartItem } from '@/types/types';
import { useFormState } from 'react-dom';
import { CgClose } from 'react-icons/cg';

export function DeleteItemButton({
  item,
  optimisticUpdate
}: {
  item: CartItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optimisticUpdate: any;
}) {
  const [message, formAction] = useFormState(removeItem, null);
  const merchandiseId = item.merchandise.id;
  const actionWithVariant = formAction.bind(null, merchandiseId);

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, 'delete');
        await actionWithVariant();
      }}
      className='rounded-lg bg-primary hover:bg-primary/80'
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center"
      >
        <CgClose className="mx-[1px] h-4 w-4 text-white" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
