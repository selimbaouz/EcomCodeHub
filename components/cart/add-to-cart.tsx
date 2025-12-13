import { SubmitButtonClient } from "./SubmitButton";

export function AddToCart({
  size = "initial",
  floatingBar = false,
}: {
  size?: "fullWidth" | "initial";
  floatingBar?: boolean;
}) {
  return <SubmitButtonClient size={size} floatingBar={floatingBar} />;
}
