import { fbUpdateUserBasket } from "@/services/firebase/basket";
import { fbGetUser } from "@/services/firebase/user";
import { BasketProductType, ProductType } from "@/types/product";

export default function useBasket() {
  // 로컬 스토리지 장바구니만 가져오기
  function getBasket() {
    let sessionStorageBasket = sessionStorage.getItem("basket");
    let localBasket = sessionStorageBasket === null ? [] : JSON.parse(sessionStorageBasket);
    return localBasket;
  }

  // 로컬과 firebase DB의 장바구니를 통일
  async function matchBasketlocalToDB(userId: string) {
    const getLocalBasket = sessionStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
    const localBasket = getLocalBasket === null ? [] : JSON.parse(getLocalBasket); // 원래 장바구니 리스트

    const userData = await fbGetUser(userId);
    const DBBasket = userData?.basket === undefined ? [] : userData?.basket;

    const mergedBasket = [...DBBasket, ...localBasket];

    // 중복 제거
    const uniqueBasket = mergedBasket.filter((product, index) => {
      const ids = mergedBasket.map((item) => item.id);
      return ids.indexOf(product.id) === index;
    });

    fbUpdateUserBasket(userId, uniqueBasket);
    sessionStorage.setItem("basket", JSON.stringify(uniqueBasket));
  }

  // 장바구니에 추가
  function addToBasket(userId: string | null, product: ProductType, quantity: number) {
    let getBasket = sessionStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
    let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트
    // 상품이 이미 장바구니에 있는지 확인
    const existingProductIndex = basket.findIndex((item: { id: string }) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // 이미 장바구니에 해당 상품이 있는 경우, 수량 업데이트
      basket[existingProductIndex].quantity = quantity;
    } else {
      // 장바구니에 해당 상품이 없는 경우, 새로 추가
      const newBasket: BasketProductType = {
        id: product.id,
        name: product.name,
        format: product.format,
        stock: product.stock,
        price: product.price,
        quantity: quantity, // 수량
        image: product.image,
      };
      basket.push(newBasket);
    }

    sessionStorage.setItem("basket", JSON.stringify(basket));
    sessionStorage.setItem("loggedIn", userId ? "yes" : "no");

    if (userId) {
      // 로그인 한 상태라면
      // DB에도 업데이트
      fbUpdateUserBasket(userId, basket);
    }
  }

  async function updateBasketProductStock(userId: string | null, basketProduct: BasketProductType, stock: number) {
    let getBasket = sessionStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
    let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트

    // 상품이 이미 장바구니에 있는지 확인
    const existingProductIndex = basket.findIndex((item: { id: string }) => item.id === basketProduct.id);

    if (existingProductIndex !== -1) {
      // 이미 장바구니에 해당 상품이 있는 경우, 수량 업데이트
      basket[existingProductIndex].stock = stock;
    }

    sessionStorage.setItem("basket", JSON.stringify(basket));

    if (userId) {
      // 로그인 한 상태라면
      // DB에도 업데이트
      fbUpdateUserBasket(userId, basket);
    }
  }

  function removeFromBasket(userId: string | null, productId: string) {
    let getBasket = sessionStorage.getItem("basket"); // 원래 있던 장바구니 꺼내기
    let basket = getBasket === null ? [] : JSON.parse(getBasket); // 원래 장바구니 리스트

    // 지울 상품 찾기
    const productIndex = basket.findIndex((item: { id: string }) => item.id === productId);

    if (productIndex !== -1) {
      basket.splice(productIndex, 1);

      sessionStorage.setItem("basket", JSON.stringify(basket));

      if (userId) {
        // 로그인 한 상태라면 DB에도 업데이트
        fbUpdateUserBasket(userId, basket);
      }
    }
  }
  return { getBasket, matchBasketlocalToDB, addToBasket, updateBasketProductStock, removeFromBasket };
}
