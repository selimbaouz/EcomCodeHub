import { Product } from '@/types/types';
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
  const stateValues = state?.title.split(" / ").map(s => s.trim());
  const variant = variants.find(v =>
    v.node.selectedOptions?.map(o => o.value.trim().toLowerCase()).join(" / ") === stateValues?.join(" / ").toLowerCase()
  ) || variants[0];

  const updatedPrice = bundle
    ? (parseFloat(state?.price ?? "0") + parseFloat(bundle.priceRange.maxVariantPrice.amount)).toFixed(2)
    : state?.price;

    
  return (
      <SubmitButtonClient 
        size={size} 
        price={updatedPrice} 
        variant={variant}
        product={product}
      />
  );
}
