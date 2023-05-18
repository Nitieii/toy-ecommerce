import React from 'react';

function SpchSortingBy(props) {
  const sortByListValues = ['Date', 'Newest', 'Popular'];

  const {
    sortListSelectedItem,
    updateSortByList,
    sortByDrop,
    sortByListDropUpdate,
  } = props;

  function handlerSetActive(e) {
    updateSortByList(e.currentTarget.getAttribute('name'));
  }

  function dropdownHandler() {
    // sortByListDropUpdate(!sortByDrop);
  }

  function sortByRender() {
    return sortByListValues.map((item) => {
      return (
        <li
          onClick={handlerSetActive}
          key={item}
          data-value='value'
          className={
            sortListSelectedItem === item ? 'option selected' : 'option'
          }
          name={item}
        >
          {item}
        </li>
      );
    });
  }

  return (
    <div className='sort-by-date d-flex align-items-center mr-15'>
      <p>Sort by</p>
      <form action='#' method='get'>
        <div
          onClick={dropdownHandler}
          className={`nice-select ${sortByDrop && 'open'}`}
          tabIndex='0'
        >
          <span className='current'>{sortListSelectedItem}</span>
          <ul className='list'>{sortByRender()}</ul>
        </div>
      </form>
    </div>
  );
}

export default SpchSortingBy;
