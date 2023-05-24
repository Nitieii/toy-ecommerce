import DataTables from '../../components/admin/datatables/datatables.tsx';
import { useProduct } from '../../hooks';
import { useEffect } from 'react';

const ProductsPage = () => {
  const {
    products,
    handleGetProducts,
    handleCurrentPage,
    loading,
    currentPage,
    totalPage,
    totalLength,
  } = useProduct();

  useEffect(() => {
    handleGetProducts(1);
  }, []);

  const handldePageChange = () => {
    if (currentPage + 1 > totalPage) return;
    handleCurrentPage(currentPage + 1);

    handleGetProducts(currentPage);
  };

  return (
    <DataTables
      tableName={'products'}
      data={products}
      totalLength={totalLength}
      onPageChange={handldePageChange}
      loading={loading}
    />
  );
};

export default ProductsPage;
