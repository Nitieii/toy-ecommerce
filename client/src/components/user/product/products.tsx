import ProductItem from './productItem.tsx';
import { Product } from '../../../store/slices/ProductsSlice.ts';

function Products(props: { products: Product[] }) {
  return (
    <div
      className='amado-pro-catagory clearfix'
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {props.products
        ? props.products.map((item: Product) => (
            <ProductItem key={item.id} {...item} />
          ))
        : null}
    </div>
  );
}

export default Products;
