import DataTables from '../../components/admin/datatables/datatables';
import { useOrder } from '../../hooks';
import { useEffect } from 'react';

const OrdersPage = () => {
  const {
    orders,
    handleGetOrders,
    totalPage,
    totalLength,
    currentPage,
    handleCurrentPage,
    loadingOrder,
  } = useOrder();

  useEffect(() => {
    handleGetOrders(1);
  }, []);

  const handldePageChange = () => {
    if (currentPage + 1 > totalPage) return;
    handleCurrentPage(currentPage + 1);

    handleGetOrders(currentPage);
  };

  console.log(orders)

  return (
    <DataTables
      tableName={'orders'}
      data={orders}
      totalLength={totalLength}
      onPageChange={handldePageChange}
      loading={loadingOrder}
      handleSearch={() => {
        console.log('search');
      }}
    />
  );
};

export default OrdersPage;
