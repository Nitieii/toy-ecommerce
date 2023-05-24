import CategoryItem from './categoryItem.tsx';
import { Category } from '../../../store/slices/CategorySlice.ts';

function Categories(props: { categories: Category[] }) {
  return (
    <div
      className='amado-pro-catagory clearfix'
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {props.categories
        ? props.categories.map((item: Category) => (
            <CategoryItem key={item._id} {...item} />
          ))
        : null}
    </div>
  );
}

export default Categories;
