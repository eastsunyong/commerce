import { OrderType } from "@/types/order";
import { memo } from "react";

function OrderComponent({ order, labels }: { order: OrderType; labels: string[] }) {
  const rowSpan = `row-span-${order.products.length}`;
  return (
    <div className="w-full grid text-center items-center">
      {order.merchant_uid !== "" ? (
        <div className="grid grid-flow-col md:grid-cols-7 gap-2 grid-cols-4">
          <div className={`${rowSpan} text-sm justify-center items-center flex-col hidden md:flex`}>
            <div>{order.merchant_uid}</div>
            <div className="text-zinc-400">{new Date(order.orderedAt).toLocaleString()}</div>
            <div className="mt-1">{order.buyer_name}</div>
          </div>
          {order.products.map((product) => (
            <div key={product.id} className=" flex justify-center items-center">
              <img decoding="async" loading="lazy" src={product.image} width={96} height={96} />
            </div>
          ))}
          {order.products.map((product) => (
            <div key={product.id} className="justify-center flex items-center md:text-base text-xs">
              {product.name}
            </div>
          ))}
          {order.products.map((product) => (
            <div key={product.id} className="justify-center items-center md:text-base text-nowrap md:flex hidden">
              {product.price}원
            </div>
          ))}
          {order.products.map((product) => (
            <div key={product.id} className="justify-center flex items-center md:text-base text-xs">
              {product.quantity}개
            </div>
          ))}
          <div className={`${rowSpan} justify-center flex items-center md:text-base text-xs`}>{order.amount}원</div>
          <div className={`${rowSpan} hidden md:flex } justify-center flex items-center`}>{order.buyer_addr}</div>
        </div>
      ) : (
        <div className="grid md:grid-cols-7 grid-cols-4">
          {labels.map((label, index) =>
            label === "주문번호" || label === "배송정보" || label === "상품가격" ? (
              <div className="hidden md:flex text-nowrap justify-center" key={index}>
                {label}
              </div>
            ) : (
              <div key={index} className="text-nowrap">
                {label}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
export default memo(OrderComponent);
