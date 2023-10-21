import { useDispatch, useSelector } from 'react-redux';

import { GET_API, PUT_API, POST_API } from '../constants/api.js';

import {
  SET_ORDERS,
  SET_ORDER,
  HANDLE_LOADING,
  SET_TOTAL_PAGE,
  SET_TOTAL_LENGTH,
  SET_CURRENT_PAGE,
} from '../store/slices/OrderSlice.ts';

import axios from '../utils/axios.js';
import useTransaction from './useTransaction.ts';

const useOrder = () => {
  const dispatch = useDispatch();

  const { currentPage, orders, loadingOrder, totalPage, totalLength, order } =
    useSelector((state: any) => state.order);

  const { handleCreateTransaction } = useTransaction();

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

          const orders = res.data.order;
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

  const handleGetUserOrders = async () => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API('', 1).GET_USER_ORDERS);
      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return alert("Can't get orders");
      }


      const orders  = data.order;

      dispatch(SET_ORDERS(orders));
      dispatch(SET_TOTAL_PAGE(data.totalPage));
      dispatch(SET_TOTAL_LENGTH(data.totalLength));

      dispatch(HANDLE_LOADING(false));

      return;
    } catch (e: any) {
      dispatch(HANDLE_LOADING(false));

      return alert(e.message);
    }
  };

  const getOrder = async (id: string) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.get(GET_API(id).GET_ORDER);
      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return alert("Can't get order: " + data.message);
      }

      const order = data.order;
      dispatch(SET_ORDER(order));
      dispatch(HANDLE_LOADING(false));

      return;
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return alert(error.message);
    }
  };

  const confirmOrder = async (id: string) => {
    try {
      dispatch(HANDLE_LOADING(true));

      const { data } = await axios.put(`${PUT_API().CONFIRM_ORDER}/${id}`);
      console.log(data)
      if (data.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return alert("Can't confirm order");
      }

      const { order } = data;

      dispatch(SET_ORDER(order));
      dispatch(HANDLE_LOADING(false));

      return alert('Confirm order successfully');
    } catch (error: any) {
      dispatch(HANDLE_LOADING(false));

      return alert(error.message);
    }
  };

  const handleCreateOrder = async (data: {
    shippingAddress: string;
    phone: string;
    totalCost: number;
  }) => {
    try {
      dispatch(HANDLE_LOADING(true));
      console.log(data);
      const { data: res } = await axios.post(POST_API().CHECKOUT, data);

      if (res.status !== 'success') {
        dispatch(HANDLE_LOADING(false));
        return alert("Can't create order");
      }

      const transaction = {
        orderId: res.order.id,
        type: 'debit',
        amount: res.order.totalCost,
        paymentMethod: 'Paypal',
        status: res.order.status,
      };

       await handleCreateTransaction(transaction);

      dispatch(HANDLE_LOADING(false));

      alert('Create order successfully');

      return window.location.replace('/orders');
    } catch (error: any) {
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
    confirmOrder,
    getOrder,
    handleCurrentPage,
    handleCreateOrder,
    handleLoading,
    handleGetUserOrders,
  };
};
export default useOrder;
