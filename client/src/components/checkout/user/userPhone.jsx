import React from 'react';

function UserPhone() {
  return (
    <div className='col-md-6 mb-3'>
      <input
        type='number'
        className='form-control'
        id='phone_number'
        min='0'
        placeholder='Phone No'
        value=''
      />
    </div>
  );
}

export default UserPhone;
