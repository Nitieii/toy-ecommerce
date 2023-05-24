import { useState } from 'react';

function UserZipCode() {
  const [zipCode, setZipCode] = useState('');

  return (
    <div className='col-md-6 mb-3'>
      <input
        type='text'
        className='form-control'
        id='zipCode'
        placeholder='Zip Code'
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
    </div>
  );
}

export default UserZipCode;
