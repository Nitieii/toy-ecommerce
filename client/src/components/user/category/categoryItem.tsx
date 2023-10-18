import { Category } from '../../../store/slices/CategorySlice.ts';

function CategoryItem(props: Category) {
  const item = props;

  return (
    <div key={item._id} className='single-products-catagory clearfix'>
      <a
        href={`shop`}
        onClick={() => {
          sessionStorage.setItem('category', item._id);
        }}
      >
        <img
          src={`https://toyecommerceaspnetapi.azurewebsites.net${item.categoryImg}`}
          alt=''
          style={{
            marginTop: '200px',
          }}
          loading='lazy'
        />
        <div className='hover-content'>
          <div className='line'></div>
          <p>From ${item.priceMin}</p>
          <h4>{item._id}</h4>
        </div>
      </a>
    </div>
  );
}

export default CategoryItem;
