import { useDispatch, useSelector } from 'react-redux';

import { POST_API } from '../constants/api.js';

import { SET_FORM_DATA, RESET_FORM_DATA } from '../store/slices/CheckoutSlice';

import axios from '../utils/axios.js';

const useCheckout = () => {
  const dispatch = useDispatch();

  const { formData } = useSelector((state: any) => state.checkout);

  const handleFormData = (step: string, data: any) => {
    console.log(step, data);
    dispatch(SET_FORM_DATA({ step, data }));
  };

  const handleResetFormData = () => {
    dispatch(RESET_FORM_DATA());
  };

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(POST_API().CHECKOUT, formData);

      if (data.status !== 'success') {
        return;
      }

      alert('Checkout successful!');

      return;
    } catch (error: any) {
      alert(error.message);
      return;
    }
  };

  return {
    formData,
    handleFormData,
    handleResetFormData,
    handleCheckout,
  };
};

export default useCheckout;
