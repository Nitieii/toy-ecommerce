import useAlert from './useAlert';
import { useDispatch, useSelector } from 'react-redux';

import { GET_API } from '../constants/api.js';

import {
  SET_PRODUCTS,
  HANDLE_LOADING,
  SET_CURRENT_PAGE,
  SET_PRODUCT,
} from '../store/slices/ProductsSlice.js';

import axios from '../utils/axios.js';

const useProduct = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useAlert();

  const { products, loading, currentPage, totalPage, totalLength, product } =
    useSelector((state: any) => state.product);

  const getProductsByCategory = async (category: string, page: number) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API(category, page).GET_CATEGORY);

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return enqueueSnackbar(data.message, { variant: 'error' });
      }

      dispatch(SET_CURRENT_PAGE(page));

      dispatch(SET_PRODUCTS(data));
      dispatch(HANDLE_LOADING(false));

      return;
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  const handleGetProduct = async (id: string) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API(id, 1).GET_PRODUCT);

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return enqueueSnackbar(data.message, { variant: 'error' });
      }

      dispatch(SET_PRODUCT(data.product));
      dispatch(HANDLE_LOADING(false));

      return;
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleCurrentPage = (page: number) => {
    dispatch(SET_CURRENT_PAGE(page));
  };

  const handleLoading = (loading: boolean) => {
    dispatch(HANDLE_LOADING(loading));
  };

  return {
    products,
    product,
    loading,
    currentPage,
    totalPage,
    totalLength,
    handleLoading,
    getProductsByCategory,
    handleCurrentPage,
    handleGetProduct,
  };
};

export default useProduct;
