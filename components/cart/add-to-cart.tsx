import { Product } from '@/types/types';
import { useFormState } from 'react-dom';
import { addItem } from './actions';
import { useCartStore } from '@/store/cart';
import { SubmitButtonClient } from './SubmitButton';

export function AddToCart({ 
  product, 
  bundle,
  size = "initial", 
  state 
}: { 
  product: Product, 
  bundle?: Product,
  size?: "fullWidth" | "initial", 
  color?: "gradient" | "foreground", 
  state?: {
  title: string,
  price?: string;
} }) {
  const variants = product.variants.edges;
  const [message] = useFormState(addItem, null);

  const stateValues = state?.title.split(" / ").map(s => s.trim());

  const variant = variants.find((variant) =>
      variant.node.selectedOptions?.map(option => option.value.trim().toLowerCase()).join(" / ") === stateValues?.join(" / ").toLowerCase()
    );

  
  /* const variantId = variants[0].node.id;
  const actionWithVariant = formAction.bind(null, variantId); */
  const defaultVariantId = variants.length === 1 ? variants[0]?.node.id : undefined;
  const selectedVariantId = variant?.node.id || defaultVariantId;
  const sellingPlanId = variant?.node.sellingPlanAllocations?.edges?.[0]?.node?.sellingPlan?.id;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actionWithVariant = async (prevState: any) => {
    addItem(prevState, selectedVariantId, sellingPlanId ? sellingPlanId : undefined);
  }
  
  /* const actionWithVariant = formAction.bind(null, selectedVariantId); */
  const finalVariant = variants.find((variant) => variant.node.id === selectedVariantId)!;
  const updatedPrice = bundle ? (parseFloat(state?.price ?? "0") + parseFloat(bundle.priceRange.maxVariantPrice.amount)).toFixed(2) : state?.price;
  
  return (
    <form
      action={async (prevState) => {
        await actionWithVariant(prevState);
      }}
    >
      <SubmitButtonClient 
        size={size} 
        price={updatedPrice} 
        variant={finalVariant}
        product={product}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
