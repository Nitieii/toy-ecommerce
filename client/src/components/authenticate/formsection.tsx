import { useState } from 'react';
import { useUser } from '../../hooks';
import Spinner from '../layouts/spinner/spinner';

const FormSection = (props: any) => {
  const { title } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');

  const { handleLogin, handleRegister, loadingUser } = useUser();

  const validateForm = () => {
    if (title === 'signin') {
      return email.length > 0 && pass.length > 0
        ? true
        : alert('Please fill in all fields');
    } else {
      if (!name || !email || !pass || !rePass) {
        alert('Please fill in all fields');
        return false;
      } // Check if email is valid
      else if (
        !email.match(
          // eslint-disable-next-line no-control-regex
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        )
      ) {
        alert('Please enter a valid email address');
        return false;
      }
      // Check if password contains at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
      else if (
        !pass.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
        )
      ) {
        alert(
          'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'
        );
        return false;
      } else if (pass !== rePass) {
        alert('Passwords do not match');
        return false;
      }

      return true;
    }
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      if (title === 'signin') {
        handleLogin(email, pass);
      } else {
        handleRegister(name, email, pass);
      }
    }
  };

  if (loadingUser) return <Spinner />;

  if (title === 'signin') {
    return (
      <div className='signin-form'>
        <h2 className='form-title'>Log In</h2>
        <div className='register-form' id='login-form'>
          <div className='form-group'>
            <label htmlFor='your_name'>
              <i className='zmdi zmdi-account material-icons-name'></i>
            </label>
            <input
              type='email'
              name='email'
              id='your_email'
              placeholder='Your Email'
              autoComplete='current-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='your_pass'>
              <i className='zmdi zmdi-lock'></i>
            </label>
            <input
              type='password'
              name='password'
              id='your_pass'
              placeholder='Password'
              autoComplete='current-password'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='checkbox'
              name='remember-me'
              id='remember-me'
              className='agree-term'
            />
            <label htmlFor='remember-me' className='label-agree-term'>
              <span>
                <span></span>
              </span>
              Remember me
            </label>
          </div>
          <div className='form-group form-button'>
            <input
              type='submit'
              name='signin'
              id='signin'
              className='form-submit'
              onClick={handleSubmitForm}
              value='Log in'
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='signup-form'>
      <h2 className='form-title'>Sign up</h2>
      <form name='register-form' className='register-form' id='register-form'>
        <div className='form-group'>
          <label htmlFor='name'>
            <i className='zmdi zmdi-account material-icons-name'></i>
          </label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>
            <i className='zmdi zmdi-email'></i>
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your Email'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='pass'>
            <i className='zmdi zmdi-lock'></i>
          </label>
          <input
            type='password'
            name='pass'
            id='pass'
            placeholder='Password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete='new-password'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='re-pass'>
            <i className='zmdi zmdi-lock-outline'></i>
          </label>
          <input
            type='password'
            name='re_pass'
            id='re_pass'
            value={rePass}
            onChange={(e) => setRePass(e.target.value)}
            placeholder='Repeat your password'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='checkbox'
            name='agree-term'
            id='agree-term'
            className='agree-term'
          />
          <label htmlFor='agree-term' className='label-agree-term'>
            I agree all statements in
            <a href='#' className='term-service'>
              Terms of service
            </a>
          </label>
        </div>
        <div className='form-group form-button'>
          <input
            type='submit'
            name='signup'
            id='signup'
            className='form-submit'
            value='Register'
            onClick={(e) => handleSubmitForm(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default FormSection;
