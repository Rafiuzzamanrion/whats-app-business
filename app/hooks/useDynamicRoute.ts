import { useRouter } from "next/navigation";

export const useCheckoutNavigation = () => {
  const router = useRouter();

  const navigateToCheckout = (
    productId: string,
    options?: {
      quantity?: number;
      source?: string;
      promotion?: string;
      reorder?: boolean;
      previousOrderId?: string;
    },
  ) => {
    const params = new URLSearchParams();

    if (options?.quantity) params.set("quantity", options.quantity.toString());
    if (options?.source) params.set("source", options.source);
    if (options?.promotion) params.set("promotion", options.promotion);
    if (options?.reorder) params.set("reorder", "true");
    if (options?.previousOrderId)
      params.set("previousOrderId", options.previousOrderId);

    const url = `/checkout/${productId}${params.toString() ? `?${params.toString()}` : ""}`;

    router.push(url);
  };

  return { navigateToCheckout };
};
