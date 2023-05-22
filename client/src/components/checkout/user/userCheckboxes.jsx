function UserCheckboxes() {
  return (
    <div className='col-12'>
      <div className='custom-control custom-checkbox d-block mb-2'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customCheck2'
        />
        <label className='custom-control-label' htmlFor='customCheck2'>
          Create an account
        </label>
      </div>

      <div className='custom-control custom-checkbox d-block'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customCheck3'
        />
        <label className='custom-control-label' htmlFor='customCheck3'>
          Ship to a different address
        </label>
      </div>
    </div>
  );
}

export default UserCheckboxes;
