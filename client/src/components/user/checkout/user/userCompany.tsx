import { useState } from 'react';

function UserCompany() {
  const [company, setCompany] = useState('');

  return (
    <div className='col-6 mb-3'>
      <input
        type='text'
        className='form-control'
        id='company'
        placeholder='Company Name'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
    </div>
  );
}

export default UserCompany;
