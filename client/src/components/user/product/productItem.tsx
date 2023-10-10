import * as URL from '../../../routes/url.ts';
import { Product } from '../../../store/slices/ProductsSlice.ts';

function ProductItem(props: Product) {
  const item = props;

  return (
    <div key={item.id} className='single-products-catagory clearfix'>
      <a href={`${URL.DETAILS}/${item.id}`}>
        <img
          src={`${item.images[0]}`}
          alt=''
          style={{
            marginTop: '200px',
          }}
          loading='lazy'
        />
        <div className='hover-content'>
          <div className='line'></div>
          <p> ${item.price}</p>
          <h4>{item.name}</h4>
        </div>
      </a>
    </div>
  );
}

export default ProductItem;
