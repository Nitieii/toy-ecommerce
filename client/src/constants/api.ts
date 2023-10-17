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
    GET_USER_BY_ID: `/user/${id}`,
    GET_USERS: `/users?page=${page}`,

    // order
    GET_ORDERS: `/orders?page=${page}`,
    GET_ORDER: `/order/${id}`,
    GET_USER_ORDERS: `/orders/user`,

    //transaction
    GET_TRANSACTIONS: `/transactions?page=${page}`,
    GET_TRANSACTION_BY_ID: `/transactions/${id}`,
  };
};

const POST_API = () => {
  return {
    // create cart
    CREATE_CART: `/cart`,

    // cart
    ADD_TO_CART: `/cart/add`,

    // authenticate
    LOGIN: `/auth/login`,
    SIGNUP: `/auth/signup`,

    // checkout
    CHECKOUT: `/order`,

    //transaction
    CREATE_TRANSACTION: `/transactions`,
  };
};

const PUT_API = () => {
  return {
    // product
    UPDATE_PRODUCT: `/product`,

    // cart
    UPDATE_CART: `/cart/update`,

    // order
    CONFIRM_ORDER: `/order`,

    // user
    UPDATE_USER: `/user`,
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
    DELETE_USER: `/user`,

    // transaction
    DELETE_TRANSACTION: `/transactions`,
  };
};

export { GET_API, POST_API, PUT_API, DELETE_API };
