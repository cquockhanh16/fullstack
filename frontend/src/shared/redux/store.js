import { createStore } from "redux";
import Cookies from "js-cookie";

const cartFromCookie = Cookies.get("cart");

const initState = {
  products: cartFromCookie ? JSON.parse(cartFromCookie) : [],
  isLogin: false,
  uid: null,
  isAdmin: false,
};

const cartReducer = (state = initState, action) => {
  let prodIndex;
  let products = state.products;
  switch (action.type) {
    case "ADD_PRODUCT":
      prodIndex = state.products.findIndex(
        (p) => p.product_id === action.payload.product.product_id
      );
      if (prodIndex < 0) {
        products = [...products, action.payload.product];
        console.log(products);
      } else {
        let p = [...products];
        console.log(p[prodIndex]);
        p[prodIndex] = {
          ...p[prodIndex],
          count: p[prodIndex].count + action.payload.product.count,
        };
        products = [...p];
      }
      Cookies.set("cart", JSON.stringify(products));
      return { ...state, products };
    case "INCREMENT":
      prodIndex = state.products.findIndex(
        (p) => p.product_id === action.payload.id
      );
      if (prodIndex < 0) {
        return state;
      } else {
        let p = [...products];

        p[prodIndex] = {
          ...p[prodIndex],
          count: ++p[prodIndex].count,
        };
        console.log(p[prodIndex]);
        products = [...p];
      }
      Cookies.set("cart", JSON.stringify(products));
      return { ...state, products };
    case "DECREMENT":
      prodIndex = state.products.findIndex(
        (p) => p.product_id === action.payload.id
      );
      if (prodIndex < 0) {
        return state;
      } else {
        let p = [...products];
        if (p[prodIndex].count === 1) return { ...state, products };
        p[prodIndex] = {
          ...p[prodIndex],
          count: p[prodIndex].count - 1,
        };
        products = [...p];
      }
      Cookies.set("cart", JSON.stringify(products));
      return { ...state, products };
    case "REMOVE_PRODUCT":
      console.log(action.payload);
      prodIndex = state.products.findIndex(
        (p) => p.product_id === action.payload.id
      );
      if (prodIndex < 0) {
        products = [...products];
      } else {
        let p = [...products];
        p = p.filter((item) => item.product_id !== action.payload.id);
        products = [...p];
      }
      Cookies.set("cart", JSON.stringify(products));
      return { ...state, products };
    case "SET_CART":
      Cookies.set("cart", JSON.stringify(action.payload));
      return { ...state, products: action.payload };
    case "ORDER_PRODUCTS":
      Cookies.remove("cart");
      return { ...state, products: [] };
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        uid: action.payload.uid,
        isAdmin: action.payload.isAdmin,
      };
    case "LOGOUT":
      return { ...initState };
    default:
      console.log(state);
      return state;
  }
};

const store = createStore(cartReducer);

export default store;
