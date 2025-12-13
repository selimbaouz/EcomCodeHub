import { Product } from "@/types/types";
import { SubmitButtonClient } from "./SubmitButton";

export function AddToCart({
  product,
  size = "initial",
  state,
}: {
  product: Product;
  size?: "fullWidth" | "initial";
  state?: {
    title: string;
    price?: string;
  };
}) {
  const variants = product.variants.edges;
  const variant = variants[0];

  const updatedPrice = state?.price;

  return (
    <SubmitButtonClient
      size={size}
      price={updatedPrice}
      variant={variant}
      product={product}
    />
  );
}
