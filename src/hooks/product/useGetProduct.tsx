import { useQuery } from "@tanstack/react-query";
import { fbGetProduct } from "@/services/firebase/product";
import { ProductType } from "@/types/product";

export default function useGetProduct(productId: string | null) {
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId || productId === "") {
        throw new Error("해당 상품이 존재하지 않습니다.");
      }
      const result = await fbGetProduct(productId);
      return result;
    },
  });

  return { isLoading, product: data as ProductType };
}
