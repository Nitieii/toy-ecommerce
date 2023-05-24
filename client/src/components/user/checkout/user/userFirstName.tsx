import { useState } from 'react';

function UserFirstName() {
  const [firstName, setFirstName] = useState('');

  return (
    <div className='col-md-6 mb-3'>
      <input
        type='text'
        className='form-control'
        id='first_name'
        placeholder='Full Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </div>
  );
}

export default UserFirstName;
