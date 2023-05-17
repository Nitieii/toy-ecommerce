const GET_API = (id: string) => {
  return {
    // products
    GET_PRODUCTS: `/products`,
    GET_PRODUCT: `/products/${id}`,

    // categories
    GET_CATEGORIES: `/categories`,
    GET_CATEGORY: `/categories/${id}`,
  };
};

export { GET_API };
