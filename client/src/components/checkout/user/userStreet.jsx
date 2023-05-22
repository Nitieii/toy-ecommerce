import React from 'react';

function UserStreet() {
  return (
    <div className='col-12 mb-3'>
      <input
        type='text'
        className='form-control mb-3'
        id='street_address'
        placeholder='Address'
        value=''
      />
    </div>
  );
}

export default UserStreet;
