import React from 'react';

function UserFirstName() {
  return (
    <div className='col-md-6 mb-3'>
      <input
        type='text'
        className='form-control'
        id='first_name'
        value=''
        placeholder='First Name'
        required=''
      />
    </div>
  );
}

export default UserFirstName;
