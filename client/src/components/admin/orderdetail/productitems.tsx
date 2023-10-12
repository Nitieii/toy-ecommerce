import '../../../assets/css/order-tracking.css';

const ProductItems = (props: { products: any }) => {
  const { products } = props;

  return (
    <ul className='row' id='productItemsContainer'>
      {products.map((item: any, index: number) => (
        <li className='col-md-4' key={index}>
          <figure className='itemside mb-3'>
            <div>
              <img src={''} className='img-sm rounded' />
            </div>
            <figcaption className=' info align-self-center'>
              <p className='title'>{}</p>{' '}
              <span className='text-muted'>
                $ {} = ${' '}
              </span>
              <span></span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
};

export default ProductItems;
