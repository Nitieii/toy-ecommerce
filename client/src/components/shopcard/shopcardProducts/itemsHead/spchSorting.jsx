import React from 'react';
import SpchSortingBy from './spchSortingBy';
import SpchSortingViewProd from './spchSortingViewProd';

function SpchSorting(props) {
  return (
    <div className='product-sorting d-flex'>
      <SpchSortingBy />
      <SpchSortingViewProd />
    </div>
  );
}

export default SpchSorting;
