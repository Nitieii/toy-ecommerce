import { useState } from 'react';

function UserCountrySelect() {
  const [country, setCountry] = useState('usa');

  return (
    <div className='col-6 mb-3'>
      <select
        className='nice-select w-100'
        id='country'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
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
