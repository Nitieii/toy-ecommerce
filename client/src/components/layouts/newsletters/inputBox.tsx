function InputBox() {
  return (
    <div className='col-12 col-lg-6 col-xl-5'>
      <div className='newsletter-form mb-100'>
        <form action='#' method='post'>
          <input
            type='email'
            name='email'
            className='nl-email'
            placeholder='Your E-mail'
          />
          <input type='submit' value='Subscribe' />
        </form>
      </div>
    </div>
  );
}

export default InputBox;
