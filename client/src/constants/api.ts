const GET_API = (id: string, page = 1) => {
  return {
    // products
    GET_PRODUCTS: `/products`,
    GET_PRODUCT: `/product/${id}`,

    // categories
    GET_CATEGORIES: `/categories`,
    GET_CATEGORY: `/category?category=${id}&page=${page}`,
  };
};

export { GET_API };
