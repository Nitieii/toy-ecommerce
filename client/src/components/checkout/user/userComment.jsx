import React from 'react';

function UserComment() {
  return (
    <div className='col-12 mb-3'>
      <textarea
        name='comment'
        className='form-control w-100'
        id='comment'
        cols='30'
        rows='10'
        placeholder='Leave a comment about your order'
      ></textarea>
    </div>
  );
}

export default UserComment;
