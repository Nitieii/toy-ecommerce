import '../assets/css/404.css';

const NotFoundPage = () => {
  return (
    <div className='container'>
      <h1 className='title'>404</h1>
      <p className='message'>Oops! Page not found</p>
      <img
        src='https://usernamehw.gallerycdn.vsassets.io/extensions/usernamehw/errorlens/3.11.0/1683385240003/Microsoft.VisualStudio.Services.Icons.Default'
        alt='Error'
        className='error-image'
      />
      <p className='description'>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <a href='/' className='button'>
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFoundPage;
