import useAlert from './useAlert';
import { useDispatch, useSelector } from 'react-redux';

import { GET_API, PUT_API, DELETE_API, POST_API } from '../constants/api.js';
import {
  SET_TRANSACTIONS,
  SET_TRANSACTION,
  HANDLE_LOADING,
  SET_TOTAL_PAGE,
  SET_TOTAL_LENGTH,
  SET_CURRENT_PAGE,
} from '../store/slices/TransactionSlice.ts';

import axios from '../utils/axios.js';

const useTransaction = () => {
  const dispatch = useDispatch();
  const {
    currentPage,
    transaction,
    loadingTransaction,
    totalPage,
    totalLength,
    transactions,
  } = useSelector((state: any) => state.transaction);

  const handleGetTransactions = async (page: number) => {
    try {
      dispatch(HANDLE_LOADING(true));

      axios
        .get(GET_API('', page).GET_TRANSACTIONS)
        .then((res) => {
          if (res.data.status !== 'success') {
            dispatch(HANDLE_LOADING(false));
            return alert("Can't get transactions");
          }

          const transactions = res.data.transaction;
          dispatch(SET_TRANSACTIONS(transactions.result));
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

  const handleGetTransactionById = async (id: string) => {
    try {
      dispatch(HANDLE_LOADING(true));

      axios
        .get(GET_API(id).GET_TRANSACTION_BY_ID)
        .then((res) => {
          if (res.data.status !== 'success') {
            dispatch(HANDLE_LOADING(false));
            return alert("Can't get transaction");
          }

          const transaction = res.data.transaction;
          dispatch(SET_TRANSACTION(transaction));
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
  }

  // const handleCreateTransa

    const handleLoading = (value: boolean) => {
      dispatch(HANDLE_LOADING(value));
    };

    const handleCurrentPage = (value: number) => {
      dispatch(SET_CURRENT_PAGE(value));
    };

  return {
    handleGetTransactions,
    transactions,
    loadingTransaction,
    totalPage,
    totalLength,
    currentPage,
    handleCurrentPage,
    handleLoading,
    handleGetTransactionById,
    transaction,
  };
};

export default useTransaction;