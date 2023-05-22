import React from 'react';

function UserZipCode() {
  return (
    <div className='col-md-6 mb-3'>
      <input
        type='text'
        className='form-control'
        id='zipCode'
        placeholder='Zip Code'
        value=''
      />
    </div>
  );
}

export default UserZipCode;
