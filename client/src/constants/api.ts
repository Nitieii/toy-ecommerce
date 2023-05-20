const GET_API = (id: string, page = 1) => {
  return {
    // products
    GET_PRODUCTS: `/products`,
    GET_PRODUCT: `/product/${id}`,

    // categories
    GET_CATEGORIES: `/categories`,
    GET_CATEGORY: `/category?category=${id}&page=${page}`,

    // cart
    GET_CART: `/cart`,

    // user
    GET_USER: `/user`,
  };
};

const POST_API = () => {
  return {
    // cart
    ADD_TO_CART: `/cart/add`,

    // authenticate
    LOGIN: `/login`,
    SIGNUP: `/signup`,
  };
};

const PUT_API = () => {
  return {
    // cart
    UPDATE_CART: `/cart/update`,
  };
};

const DELETE_API = () => {
  return {
    // cart
    DELETE_CART_ITEM: `/cart/deleteItem`,
  };
};

export { GET_API, POST_API, PUT_API, DELETE_API };
