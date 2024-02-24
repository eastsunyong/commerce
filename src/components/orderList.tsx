import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetOrders from "@/hooks/order/useGetOrders";
import useCancelOrderMutation from "@/hooks/order/useCancelOrderMutation";
import useCancelOrder from "@/hooks/order/useCancelOrder";
import OrderComponent from "./orderComponent";
import { OrderType } from "@/types/order";
import { Button } from "./ui/button";
import SelectOrderState from "./selectOrderStatus";
import Alert from "./alert";

// 페이지네이션 ?
export default function OrderList({ isAdmin }: { isAdmin: boolean }) {
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
  });
  const userInfo = useContext(AuthContext);
  const { data, status, isFetchingNextPage, fetchNextPage, refetch } = useGetOrders(isAdmin, userInfo?.id);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const { cancelOrder } = useCancelOrderMutation(refetch);
  const { onCancelOrder, setShowAlert, showAlert, alertContent } = useCancelOrder(cancelOrder);

  const labels = ["주문번호", "이미지", "주문상품", "상품가격", "수량", "합계", "배송정보"];
  const [ordersWithTitle, setOrdersWithTitle] = useState<OrderType[]>();

  const orders = useMemo(() => {
    if (data?.pages !== null) {
      return data?.pages as OrderType[];
    }
    return [];
  }, [data]);

  useEffect(() => {
    if (orders) {
      const withTitle = [
        {
          merchant_uid: "",
          amount: 0,
          name: "",
          status: "",
          products: [],
          orderedAt: 0,
          buyer_uid: "",
          buyer_name: "",
          buyer_tel: "",
          buyer_email: "",
          buyer_addr: "",
          buyer_postcode: "",
        },
        ...orders.flat(),
      ];
      setOrdersWithTitle(withTitle);
    }
  }, [orders]);

  return (
    <>
      <Alert alertContent={alertContent} setShowAlert={setShowAlert} showAlert={showAlert} />
      <div className="flex flex-col mt-4">
        <hr />
        {status === "success" && ordersWithTitle ? (
          <div className="mt-4 flex flex-col gap-5 text-base">
            {ordersWithTitle?.map((order) => (
              <>
                <div key={order.merchant_uid} className="flex flex-row items-center md:gap-3 md:text-base text-sm">
                  <OrderComponent order={order} labels={labels} />
                  <div className="md:w-[128px] w-[100px] flex justify-center">
                    {order.merchant_uid ? (
                      !isAdmin ? (
                        <Button
                          id="cancel_orer"
                          disabled={order.status === "주문 취소"}
                          onClick={() => {
                            onCancelOrder(order.merchant_uid, order.name);
                          }}
                          className="bg-zinc-0 border-zinc-800 border text-zinc-800 hover:bg-zinc-100 disabled:bg-zinc-100"
                        >
                          취소하기
                        </Button>
                      ) : (
                        <SelectOrderState id={order.merchant_uid} />
                      )
                    ) : isAdmin ? (
                      <div>주문상태</div>
                    ) : (
                      <div>주문취소</div>
                    )}
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>
        ) : (
          <p>주문이 존재하지 않습니다.</p>
        )}
      </div>
      {/* 다음 페이지 로딩 중인 경우 */}
      <div ref={inViewRef} className="h-42 w-full">
        {isFetchingNextPage && <p>loading...</p>}
      </div>
    </>
  );
}
