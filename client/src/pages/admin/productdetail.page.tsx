import ProductDetail from '../../components/admin/productdetail/productdetail.tsx';
import { useCategory, useProduct } from '../../hooks';
import Spinner from '../../components/layouts/spinner/spinner.tsx';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { product, handleGetProduct, loading } = useProduct();
  const { categories, getCategories } = useCategory();

  const { id } = useParams();

  useEffect(() => {
    getCategories();

    handleGetProduct(id || '');
  }, []);

  if (loading) return <Spinner />;

  return <ProductDetail product={product} categories={categories} />;
};

export default ProductDetailPage;
