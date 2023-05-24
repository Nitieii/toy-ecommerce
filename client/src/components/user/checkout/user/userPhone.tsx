import { useState } from 'react';

function UserPhone() {
  const [phone, setPhone] = useState('');

  return (
    <div className='col-md-6 mb-3'>
      <input
        type='number'
        className='form-control'
        id='phone_number'
        placeholder='Phone No'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  );
}

export default UserPhone;
