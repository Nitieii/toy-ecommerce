const GET_API = (id: string, page = 1) => {
  return {
    // products
    GET_PRODUCTS: `/products?page=${page}`,
    GET_PRODUCT: `/product/${id}`,
    SEARCH_PRODUCTS: `/products/search?query=${id}&page=${page}`,

    // categories
    GET_CATEGORIES: `/categories`,
    GET_CATEGORY: `/category?category=${id}&page=${page}`,

    // cart
    GET_CART: `/cart`,

    // user
    GET_USER: `/user`,
    GET_USERS: `/users?page=${page}`,

    // order
    GET_ORDERS: `/orders?page=${page}`,
    GET_ORDER: `/order/${id}`,
  };
};

const POST_API = () => {
  return {
    // create cart
    CREATE_CART: `/cart`,

    // cart
    ADD_TO_CART: `/cart/add`,

    // authenticate
    LOGIN: `/login`,
    SIGNUP: `/signup`,

    // checkout
    CHECKOUT: `/checkout`,
  };
};

const PUT_API = () => {
  return {
    // product
    UPDATE_PRODUCT: `/product`,

    // cart
    UPDATE_CART: `/cart/update`,

    // order
    CONFIRM_ORDER: `/order/update`,

    // user
    UPDATE_USER: `/user/update`,
  };
};

const DELETE_API = () => {
  return {
    // product
    DELETE_PRODUCT: `/product`,

    // cart
    DELETE_CART_ITEM: `/cart/deleteItem`,

    // order
    DELETE_ORDER: `/order/delete`,

    // user
    DELETE_USER: `/user/delete`,
  };
};

export { GET_API, POST_API, PUT_API, DELETE_API };
