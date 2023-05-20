import ImageSection from './img-section';
import FormSection from './formsection';

const Login = () => {
  return (
    <div className='main'>
      <section className='sign-in'>
        <div className='container'>
          <div className='signin-content'>
            <ImageSection title={'signin'} />

            <FormSection title={'signin'} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
