import { products } from "@wix/stores";

type Variant = products.Variant;

type SelectedOptions = string;

export const findMatchingVariant = (
  selectedOptions: SelectedOptions,
  variants: Variant[]
): string | undefined => {
  const matchingVariant = variants.find(
    (variant) =>
      variant.choices &&
      Object.values(variant.choices).some(
        (choice) => choice === selectedOptions
      )
  );

  return matchingVariant?._id;
};
