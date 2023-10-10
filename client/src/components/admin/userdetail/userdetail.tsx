import { User } from '../../../store/slices/UserSlice.ts';
import { useState } from 'react';

const UserDetail = (props: {
  user: User;
  handleUpdateUserInfo: any;
  handleDeleteUser: any;
}) => {
  const { user, handleUpdateUserInfo, handleDeleteUser } = props;

  const [name, setName] = useState(user?.fullname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.isAdmin ? 'Admin' : 'User');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const updateInfo = {
      fullname: name,
      email: email,
      isAdmin: role === 'Admin',
    };

    handleUpdateUserInfo(user?.id, updateInfo);
  };

  const handleDelete = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (confirm) handleDeleteUser(user?.id);
  };

  return (
    <div className='cart-table-area section-padding-100'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-lg-8'>
            <div className='cart-title mt-50'>
              <h2 id='product-title'>User details</h2>
            </div>

            <div className='col-md-12'>
              <form action='' id='productform' encType='multipart/form-data'>
                <div className='form-group'>
                  <label htmlFor='id' id='product_id_label'>
                    ID (cannot change this field)
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='product_id'
                    name='id'
                    value={user?.id}
                    readOnly
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='fullName'>Full Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='fullname'
                    id='fullname'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='product_quantity'>Email</label>
                      <input
                        type='text'
                        className='form-control'
                        name='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='category'>Role</label>

                      <select
                        className='form-control'
                        name='category'
                        id='category'
                        onChange={(e) => setRole(e.target.value)}
                        value={user?.isAdmin ? 'Admin' : 'User'}
                      >
                        <option value={'Admin'}>Admin</option>

                        <option value={'User'}>User</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='row mt-5'>
                    <div className='col'>
                      <button
                        type='submit'
                        className='btn amado-btn'
                        id='create-product'
                        onClick={(e) => handleSubmit(e)}
                      >
                        Save change
                      </button>
                    </div>

                    <div className='col'>
                      <a
                        id='delete-btn'
                        className='btn amado-btn active'
                        onClick={handleDelete}
                        style={{ color: 'white' }}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
