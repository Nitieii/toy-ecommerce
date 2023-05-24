import { useState } from 'react';

function UserStreet() {
  const [address, setAddress] = useState('');

  return (
    <div className='col-6 mb-3'>
      <input
        type='text'
        className='form-control mb-3'
        id='street_address'
        placeholder='Address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  );
}

export default UserStreet;
