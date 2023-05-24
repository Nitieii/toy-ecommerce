import { useProduct } from '../../../../../hooks';

function SpchTotalProducts() {
  const { currentPage, totalLength, loading } = useProduct();

  const startItem = (Number(currentPage) - 1) * Number(totalLength);
  const endItem = startItem + Number(totalLength);

  if (!loading) {
    if (!totalLength) {
      return (
        <div className='total-products'>
          <p>No products found</p>
        </div>
      );
    }

    return (
      <div className='total-products'>
        <p>{`Showing ${startItem + 1} - ${endItem}`}</p>
        <div className='view d-flex'>
          <a href='#'>
            <i className='fa fa-th-large' aria-hidden='true'></i>
          </a>
          <a href='#'>
            <i className='fa fa-bars' aria-hidden='true'></i>
          </a>
        </div>
      </div>
    );
  }

  return <div></div>;
}

export default SpchTotalProducts;
