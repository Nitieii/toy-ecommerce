import searchIcon from '../../../assets/img/core-img/search.png';
import { useProduct } from '../../../hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { handleSearchMode, handleSearchProducts } = useProduct();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    handleSearchProducts(search, 1);

    handleSearchMode(false);

    document.body.classList.toggle('search-wrapper-on');

    setSearch('');

    navigate('/search');
  };

  return (
    <div className='search-wrapper section-padding-100'>
      <div
        className='search-close'
        onClick={() => {
          handleSearchMode(false);
          document.body.classList.toggle('search-wrapper-on');
        }}
      >
        <i className='fa fa-close' aria-hidden='true'></i>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='search-content'>
              <form id='search-input'>
                <input
                  type='search'
                  id='search'
                  placeholder='Type your keyword...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type='submit' onClick={(e) => handleSubmit(e)}>
                  <img src={searchIcon} alt='' />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
