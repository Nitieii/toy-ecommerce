import useAlert from './useAlert';
import { useDispatch, useSelector } from 'react-redux';

import { GET_API } from '../constants/api.js';

import {
  SET_CATEGORIES,
  SET_SELECTED_CATEGORY,
  HANDLE_LOADING,
} from '../store/slices/CategorySlice.js';

import axios from '../utils/axios.js';

const useCategory = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useAlert();

  const { categories, loading, selectedCategory } = useSelector(
    (state: any) => state.category
  );

  const getCategories = async () => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API('1').GET_CATEGORIES);

      if (data.status !== 'success') {
        return enqueueSnackbar(data.message, { variant: 'error' });
      }

      const categories = data.categories;

      dispatch(SET_CATEGORIES(categories));
      dispatch(HANDLE_LOADING(false));

      return;
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleSelectedCategory = (category: string) => {
    dispatch(SET_SELECTED_CATEGORY(category));
  };
  const handleLoading = (loading: boolean) => {
    dispatch(HANDLE_LOADING(loading));
  };

  return {
    categories,
    selectedCategory,
    loading,
    handleSelectedCategory,
    handleLoading,
    getCategories,
  };
};

export default useCategory;
