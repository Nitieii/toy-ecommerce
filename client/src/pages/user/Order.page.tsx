import DataTables from '../../components/admin/datatables/datatables';
import { useOrder } from '../../hooks';
import { useEffect } from 'react';

const OrdersUserPage = () => {
  const { orders, handleGetUserOrders, totalLength, loadingOrder } = useOrder();

  useEffect(() => {
    handleGetUserOrders();
  }, []);

  console.log(orders)
  const handlePageChange = () => {};

  return (
    <DataTables
      tableName={'orders'}
      data={orders}
      totalLength={totalLength}
      onPageChange={handlePageChange}
      loading={loadingOrder}
      handleSearch={() => {
        console.log('search');
      }}
    />
  );
};

export default OrdersUserPage;
