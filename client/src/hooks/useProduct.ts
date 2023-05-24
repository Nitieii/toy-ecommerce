import useAlert from './useAlert';
import { useDispatch, useSelector } from 'react-redux';

import { GET_API } from '../constants/api.js';

import {
  SET_PRODUCTS,
  HANDLE_LOADING,
  SET_CURRENT_PAGE,
  SET_PRODUCT,
  SET_SEARCH_MODE,
  SET_TOTAL_PAGES,
  SET_TOTAL_LENGTH,
} from '../store/slices/ProductsSlice.js';

import axios from '../utils/axios.js';

const useProduct = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useAlert();

  const {
    products,
    loading,
    currentPage,
    totalPage,
    totalLength,
    product,
    searchMode,
  } = useSelector((state: any) => state.product);

  const handleGetProducts = async (page: number) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API('', page).GET_PRODUCTS);

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return alert(data.message);
      }

      dispatch(SET_CURRENT_PAGE(page));
      dispatch(SET_TOTAL_PAGES(data.totalPages));
      dispatch(SET_TOTAL_LENGTH(data.totalProducts));

      dispatch(SET_PRODUCTS(data.products));
      dispatch(HANDLE_LOADING(false));

      return;
    } catch (error: any) {
      return alert(error.message);
    }
  };
  const getProductsByCategory = async (category: string, page: number) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API(category, page).GET_CATEGORY);

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return enqueueSnackbar(data.message, { variant: 'error' });
      }

      dispatch(SET_CURRENT_PAGE(page));

      dispatch(SET_PRODUCTS(data.products));

      dispatch(SET_TOTAL_LENGTH(data.totalLength));
      dispatch(SET_TOTAL_PAGES(data.totalPage));
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
  const handleSearchProducts = async (query: string, page: number) => {
    try {
      dispatch(HANDLE_LOADING(true));

      // Remove all empty space at the beginning and end of the string
      query = query.trim();

      const { data } = await axios.get(GET_API(query, page).SEARCH_PRODUCTS);

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return enqueueSnackbar(data.message, { variant: 'error' });
      }

      dispatch(SET_PRODUCTS(data));
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

  const handleSearchMode = (searchMode: boolean) => {
    dispatch(SET_SEARCH_MODE(searchMode));
  };

  return {
    products,
    product,
    loading,
    currentPage,
    totalPage,
    totalLength,
    searchMode,
    handleGetProducts,
    handleLoading,
    getProductsByCategory,
    handleCurrentPage,
    handleGetProduct,
    handleSearchMode,
    handleSearchProducts,
  };
};

export default useProduct;
