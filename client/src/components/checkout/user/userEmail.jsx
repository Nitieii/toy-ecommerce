import React from 'react';

function UserEmail() {
  return (
    <div className='col-12 mb-3'>
      <input
        type='email'
        className='form-control'
        id='email'
        placeholder='Email'
        value=''
      />
    </div>
  );
}

export default UserEmail;
