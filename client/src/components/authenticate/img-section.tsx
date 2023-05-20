import signInImage from '../../assets/img/signin-image.jpg';
import signupImage from '../../assets/img/signup-image.jpg';

const ImgSection = (props: any) => {
  const { title } = props;

  return (
    <div className='signin-image'>
      <figure>
        <img
          src={title === 'signin' ? signInImage : signupImage}
          alt='sign in image'
        />
      </figure>
      <a
        href={title === 'signin' ? 'signup' : 'login'}
        className='signup-image-link'
      >
        {title === 'signin' ? 'Create an account' : 'I am already member'}
      </a>
    </div>
  );
};

export default ImgSection;
