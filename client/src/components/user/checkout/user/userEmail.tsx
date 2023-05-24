import { useState } from 'react';

function UserEmail() {
  const [email, setEmail] = useState('');

  return (
    <div className='col-12 mb-3'>
      <input
        type='email'
        className='form-control'
        id='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

export default UserEmail;
