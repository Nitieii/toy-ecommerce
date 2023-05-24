import React from 'react';
import SpchSortingBy from './spchSortingBy.jsx';
import SpchSortingViewProd from './spchSortingViewProd.jsx';

function SpchSorting(props) {
  return (
    <div className='product-sorting d-flex'>
      <SpchSortingBy />
      <SpchSortingViewProd />
    </div>
  );
}

export default SpchSorting;
