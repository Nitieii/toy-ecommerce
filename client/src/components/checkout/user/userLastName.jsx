import React from 'react';

function UserLastName() {
  return (
    <div className='col-md-6 mb-3'>
      <input
        type='text'
        className='form-control'
        id='last_name'
        value=''
        placeholder='Last Name'
        required=''
      />
    </div>
  );
}

export default UserLastName;
