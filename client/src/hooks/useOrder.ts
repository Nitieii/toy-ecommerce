import { useDispatch, useSelector } from 'react-redux';

import { GET_API } from '../constants/api.js';

import {
  SET_ORDERS,
  SET_ORDER,
  HANDLE_LOADING,
  SET_TOTAL_PAGE,
  SET_TOTAL_LENGTH,
  SET_CURRENT_PAGE,
} from '../store/slices/OrderSlice.ts';

import axios from '../utils/axios.js';

const useOrder = () => {
  const dispatch = useDispatch();

  const { currentPage, orders, loadingOrder, totalPage, totalLength, order } =
    useSelector((state: any) => state.order);

  const handleGetOrders = async (page: number) => {
    try {
      dispatch(HANDLE_LOADING(true));

      axios
        .get(GET_API('', page).GET_ORDERS)
        .then((res) => {
          if (res.data.status !== 'success') {
            dispatch(HANDLE_LOADING(false));
            return alert("Can't get orders");
          }

          const { orders } = res.data;

          dispatch(SET_ORDERS(orders));
          dispatch(SET_TOTAL_PAGE(res.data.totalPage));
          dispatch(SET_TOTAL_LENGTH(res.data.totalLength));

          dispatch(HANDLE_LOADING(false));

          return;
        })
        .catch((error) => {
          dispatch(HANDLE_LOADING(false));

          return alert(error.message);
        });
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return alert(error.message);
    }
  };
  const getOrder = async (id: string) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API(id).GET_ORDER);

      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return alert("Can't get order");
      }

      const { order } = data;

      dispatch(SET_ORDER(order));
      dispatch(HANDLE_LOADING(false));

      return;
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return alert(error.message);
    }
  };

  const handleLoading = (value: boolean) => {
    dispatch(HANDLE_LOADING(value));
  };

  const handleCurrentPage = (value: number) => {
    dispatch(SET_CURRENT_PAGE(value));
  };

  return {
    currentPage,
    orders,
    order,
    loadingOrder,
    totalPage,
    totalLength,
    handleGetOrders,
    getOrder,
    handleCurrentPage,
    handleLoading,
  };
};
export default useOrder;
