import useAlert from './useAlert';
import { useDispatch, useSelector } from 'react-redux';

import { GET_API, POST_API, PUT_API, DELETE_API } from '../constants/api.js';

import { SET_CART, HANDLE_LOADING } from '../store/slices/CartSlice.ts';

import axios from '../utils/axios.js';

const useCart = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useAlert();

  const { products, loadingCart, totalPrice } = useSelector(
    (state: any) => state.cart
  );

  const getCart = async () => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API('', 1).GET_CART);

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return alert("Can't get cart");
      }

      dispatch(SET_CART(data.cart));
      dispatch(HANDLE_LOADING(false));

      return;
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return alert(error.message);
    }
  };

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.post(POST_API().ADD_TO_CART, {
        productId,
        quantity,
      });

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return alert("Can't add to cart");
      }

      const { cart } = data;
      dispatch(SET_CART(cart));

      dispatch(HANDLE_LOADING(false));

      return alert('Add to cart successfully!');
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return alert(error.message);
    }
  };

  const updateCart = async (productId: string, quantity: number) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.put(PUT_API().UPDATE_CART, {
        productId,
        quantity,
      });

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return enqueueSnackbar(data.message, { variant: 'error' });
      }

      const { cart } = data;

      dispatch(SET_CART(cart));

      dispatch(HANDLE_LOADING(false));
      return;
    } catch (error: any) {
      return enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const removeCartItem = async (productId: string) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.delete(DELETE_API().DELETE_CART_ITEM, {
        data: { productId },
      });

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return enqueueSnackbar(data.message, { variant: 'error' });
      }

      const { cart } = data;
      dispatch(SET_CART(cart));

      dispatch(HANDLE_LOADING(false));
      return;
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));
      return enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleLoading = (value: boolean) => {
    dispatch(HANDLE_LOADING(value));
  };

  return {
    products,
    totalPrice,
    loadingCart,
    getCart,
    handleAddToCart,
    updateCart,
    handleLoading,
    removeCartItem,
  };
};

export default useCart;
