import React from 'react';

function UserCountrySelect(props) {
  return (
    <div className='col-12 mb-3'>
      <select className='nice-select w-100' id='country'>
        <option value='usa'>United States</option>
        <option value='uk'>United Kingdom</option>
        <option value='ger'>Germany</option>
        <option value='fra'>France</option>
        <option value='ind'>India</option>
        <option value='aus'>Australia</option>
        <option value='bra'>Brazil</option>
        <option value='cana'>Canada</option>
      </select>
    </div>
  );
}

export default UserCountrySelect;
