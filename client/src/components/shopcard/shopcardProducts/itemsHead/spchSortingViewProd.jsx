import React from 'react';

function SpchSortingViewProd(props) {
  const viewListValues = [4, 8, 16, 24];

  const {
    viewListSelectedItem,
    updateViewList,
    viewListDrop,
    viewListDropUpdate,
    updateActivePage,
  } = props;

  function handlerSetActive(e) {
    updateViewList(e.currentTarget.getAttribute('name'));
    updateActivePage('1'); // сбрасываем на первую страницу
  }

  function dropdownHandler() {
    // viewListDropUpdate(!viewListDrop);
  }

  // Поставь каунтер и прекращай рендер иф каунтер == кол-ву элементов в стейте.
  function viewListValuesRender() {
    return viewListValues.map((item) => {
      return (
        <li
          onClick={handlerSetActive}
          key={item}
          data-value='value'
          className={
            viewListSelectedItem == item ? 'option selected' : 'option'
          } // если выбранный элем совпадает с элемом маппа, то selected для форматирования
          name={item}
        >
          {item}
        </li>
      );
    });
  }

  return (
    <div className='view-product d-flex align-items-center'>
      <p>View</p>
      <form action='#' method='get'>
        <div
          onClick={dropdownHandler}
          className={`nice-select ${viewListDrop && 'open'}`}
          tabIndex='0'
        >
          <span className='current'>{viewListSelectedItem}</span>
          <ul className='list'>{viewListValuesRender()}</ul>
        </div>
      </form>
    </div>
  );
}

export default SpchSortingViewProd;
