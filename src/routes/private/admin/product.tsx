import Alert from "@/components/alert";
import ProductDetail from "@/components/productDetail";
import ProductInfo from "@/components/productInfo";
import { Button } from "@/components/ui/button";
import useDeleteProductMutation from "@/hooks/product/useDeleteProductMutation";
import useGetProduct from "@/hooks/product/useGetProduct";
import useShowAlert from "@/hooks/useShowAlert";
import { ProductType } from "@/types/product";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const { isLoading, product } = useGetProduct(productId);
  const { deleteProduct, mutateAlertContent, setMutateShowAlert, mutateShowAlert } = useDeleteProductMutation();
  const { alertContent, showAlert, setShowAlert, setConfirm, setAlertContent, confirm } = useShowAlert();

  useEffect(() => {
    if (confirm && productId) {
      deleteProduct(productId);
    }
  }, [confirm]);

  return (
    <>
      <Alert alertContent={mutateAlertContent} setShowAlert={setMutateShowAlert} showAlert={mutateShowAlert} />
      <Alert alertContent={alertContent} setShowAlert={setShowAlert} showAlert={showAlert} setConfirm={setConfirm} />

      <div className="flex flex-col">
        {!isLoading && product ? (
          <>
            <ProductInfo product={product} isAdmin={true} />
            <div className="w-full right-0 flex justify-end items-center gap-3 mt-5">
              <Button
                id="delete_product"
                onClick={() => {
                  setShowAlert(true);
                  setAlertContent({
                    title: "상품 삭제",
                    desc: `${product.id} 상품을 삭제하시겠습니까?`,
                    nav: null,
                  });
                }}
                className="bg-zinc-500 w-28 hover:bg-zinc-600"
              >
                상품 삭제
              </Button>
              <Button
                id="edit_product"
                className="bg-zinc-400 w-28 hover:bg-zinc-500"
                onClick={() => navigate({ pathname: "/edit-product", search: `?id=${product.id}` })}
              >
                상품 정보 수정
              </Button>
            </div>
            <ProductDetail product={product as ProductType} />
          </>
        ) : (
          <>상품이 존재하지 않습니다.</>
        )}
      </div>
    </>
  );
}
