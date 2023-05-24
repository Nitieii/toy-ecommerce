import { useProduct } from '../../../../hooks';

function SpcRowFoot() {
  const { totalPage, currentPage, handleCurrentPage } = useProduct();

  const pageArray: number[] = [];

  for (let i = 1; i <= totalPage; i++) {
    pageArray.push(i);
  }

  function pagesNumberHandler(selectedPage: number) {
    handleCurrentPage(selectedPage);
  }

  return (
    <div className='row'>
      <div className='col-12'>
        <nav aria-label='navigation'>
          <ul className='pagination justify-content-end mt-50'>
            {pageArray.map((item: number) => {
              return (
                <li
                  key={item}
                  className={`page-item ${
                    currentPage === item ? 'active' : ''
                  }`}
                  onClick={() => pagesNumberHandler(item)}
                >
                  <a className='page-link' href='#'>
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SpcRowFoot;
