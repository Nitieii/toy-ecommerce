import DataTables from '../../components/admin/datatables/datatables.tsx';
import { useUser } from '../../hooks';
import { useEffect } from 'react';

const ProductsPage = () => {
  const {
    users,
    handleGetUsers,
    handleCurrentPage,
    loadingUser,
    currentPage,
    totalPages,
    totalLength,
  } = useUser();

  useEffect(() => {
    handleGetUsers(1);
  }, []);

  const handldePageChange = () => {
    if (currentPage + 1 > totalPages) return;
    handleCurrentPage(currentPage + 1);

    handleGetUsers(currentPage);
  };

  return (
    <DataTables
      tableName={'users'}
      data={users}
      totalLength={totalLength}
      onPageChange={handldePageChange}
      loading={loadingUser}
    />
  );
};

export default ProductsPage;
