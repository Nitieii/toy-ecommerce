import { useEffect } from 'react';
import { useCategory } from '../../hooks';
import Categories from '../../components/user/category/categories.tsx';
import Spinner from '../../components/layouts/spinner/spinner.tsx';

const HomePage = () => {
  const { categories, loading, getCategories } = useCategory();

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories();
    };

    fetchCategories();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className='products-catagories-area clearfix'>
      <div className='amado-catagory'>
        <Categories categories={categories} />
      </div>
    </div>
  );
};

export default HomePage;
