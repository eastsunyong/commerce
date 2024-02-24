import { DocumentData } from "firebase/firestore";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import useGetRecommandProducts from "@/hooks/product/useGetRecommandProducts";
import { preloadImage } from "@/lib/utils";
import { memo } from "react";

function RecommandProducts({ category, productId }: { category: string; productId: string }) {
  const navigate = useNavigate();
  const { isLoading, recommands } = useGetRecommandProducts(productId, category, 4);

  return (
    <div>
      <div className="text-zinc-700 ml-2 md:ml-8 mt-6">추천 상품</div>
      <div className="flex flex-row justify-center md:mt-10 mt-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : recommands && recommands.length > 0 ? (
          <Carousel opts={{ align: "start" }} className="w-11/12">
            <CarouselContent>
              {recommands.map((product: DocumentData) => (
                <CarouselItem key={product?.id} className="basis-1/2 sm:basis-1/4 cursor-pointer flex justify-center">
                  <div className="md:flex hidden">
                    {product?.image ? (
                      <div
                        className="relative overflow-hidden"
                        onClick={() => {
                          preloadImage(product.image, product.name);
                          navigate({ pathname: "/product", search: `?id=${product.id}` });
                        }}
                      >
                        <img
                          decoding="async"
                          loading="lazy"
                          src={product.image[0]}
                          width={240}
                          height={240}
                          className="h-60 w-60 object-contain transition-transform transform-gpu hover:scale-105"
                          alt={product?.name}
                        />
                      </div>
                    ) : (
                      <div className="w-60 h-60 bg-zinc-100" />
                    )}
                  </div>
                  <div className="md:hidden flex">
                    {product?.image ? (
                      <div
                        className="relative overflow-hidden"
                        onClick={() => {
                          preloadImage(product.image, product.name);
                          navigate({ pathname: "/product", search: `?id=${product.id}` });
                        }}
                      >
                        <img
                          decoding="async"
                          loading="lazy"
                          src={product.image[0]}
                          width={160}
                          height={160}
                          className="h-40 w-40 object-contain transition-transform transform-gpu hover:scale-105"
                          alt={product?.name}
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 bg-zinc-100" />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="mt-6" />
            <CarouselNext className="mt-6" />
          </Carousel>
        ) : (
          <p>추천 상품이 존재하지 않습니다.</p>
        )}
      </div>
    </div>
  );
}

export default memo(RecommandProducts);
