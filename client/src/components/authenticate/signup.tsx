import ImageSection from './img-section';
import FormSection from './formsection';

const Signup = () => {
  return (
    <div className='main'>
      <section className='signup'>
        <div className='container'>
          <div className='signup-content'>
            <FormSection title={'signup'} />

            <ImageSection title={'signup'} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
