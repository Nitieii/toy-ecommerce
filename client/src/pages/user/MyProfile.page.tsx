import { useUser } from '../../hooks';
import Spinner from '../../components/layouts/spinner/spinner.tsx';
import { useEffect, useState } from 'react';

const MyProfilePage = () => {
  const userLocal = localStorage.getItem('user');
  const userId = JSON.parse(userLocal || '{}')._id;

  const { handleGetUser, loadingUser, user, handleUpdateUser } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    handleGetUser(userId);
  }, []);

  useEffect(() => {
    setName(user?.fullname);
    setEmail(user?.email);
  }, [user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      fullname: name,
      email: email,
      role: true,
    };

    handleUpdateUser(userId, data);
  };

  if (loadingUser) return <Spinner />;

  return (
    <div className='cart-table-area section-padding-100'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-lg-8'>
            <div className='cart-title mt-50'>
              <h2>Profile</h2>
            </div>

            <div className='row' style={{ height: '100%' }}>
              <div className='col-md-3'>
                <div className='d-inline'>
                  <img
                    src={user?.image_url}
                    alt={'Profile Picture'}
                    width='130px'
                    style={{ margin: 0, borderRadius: '50%' }}
                  />
                  <br />
                  <p className='pl-2 mt-2'>
                    <a
                      className='btn'
                      type='file'
                      style={{ color: ' #8f9096', fontWeight: 600 }}
                    >
                      Edit Picture
                    </a>
                  </p>
                </div>
              </div>

              <div className='col-md-9'>
                <div>
                  <form action='' method='post' id='profile-form'>
                    <div className='form-group'>
                      <label htmlFor='fullName'>
                        ID (cannot change this field)
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        name='id'
                        readOnly
                        value={user?._id}
                        placeholder='First Name'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='fullName'>Full Name</label>
                      <input
                        type='text'
                        className='form-control'
                        name='fullname'
                        id='full_name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='First Name'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='email'
                        className='form-control'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        id='email'
                        value={email}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='pass'>Password</label>
                      <input
                        type='password'
                        className='form-control'
                        name='password'
                        id='pass'
                        readOnly
                        disabled
                      />
                    </div>
                    <div className='row'>
                      <div className='row mt-5'>
                        <div className='col'>
                          <button
                            type='submit'
                            className='btn amado-btn'
                            onClick={(e) => handleSubmit(e)}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
