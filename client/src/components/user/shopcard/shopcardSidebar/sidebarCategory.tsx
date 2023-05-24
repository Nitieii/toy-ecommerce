import { useEffect } from 'react';
import { useCategory, useProduct } from '../../../../hooks';
import Spinner from '../../../layouts/spinner/spinner.tsx';
import { Category } from '../../../../store/slices/CategorySlice.ts';

function SidebarCategory() {
  const {
    loading,
    categories,
    getCategories,
    selectedCategory,
    handleSelectedCategory,
  } = useCategory();

  const { getProductsByCategory, currentPage } = useProduct();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const category: string | null = sessionStorage.getItem('category');

    if (category) {
      handleSelectedCategory(category);
      sessionStorage.removeItem('category');
      getProductsByCategory(category, currentPage);
    } else {
      getProductsByCategory(selectedCategory, currentPage);
    }
  }, [currentPage, selectedCategory]);

  if (loading) {
    return <Spinner />;
  }

  const categoryList: Category[] = [
    {
      _id: 'All',
      priceMin: 0,
      categoryImg: '',
    },
    ...categories,
  ];

  function categoryChangeHandler(selectedCategory: string) {
    handleSelectedCategory(selectedCategory);
  }

  function renderBrandsList() {
    return categoryList.map((item: Category) => {
      return (
        <li
          onClick={() => categoryChangeHandler(item._id)}
          key={item._id}
          className={selectedCategory === item._id ? 'active' : ''}
        >
          <a href='#'> {item._id} </a>
        </li>
      );
    });
  }

  return (
    <div className='widget catagory mb-50'>
      <h6 className='widget-title mb-30'>Categories</h6>
      <div className='catagories-menu'>
        <ul>{renderBrandsList()}</ul>
      </div>
    </div>
  );
}

export default SidebarCategory;
