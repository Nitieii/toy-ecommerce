import UserDetail from '../../components/admin/userdetail/userdetail.tsx';
import { useUser } from '../../hooks';
import { useEffect } from 'react';
import Spinner from '../../components/layouts/spinner/spinner.tsx';

const UserDetailPage = () => {
  const {
    handleGetUser,
    user,
    loadingUser,
    handleUpdateUser,
    handleDeleteUser,
  } = useUser();

  const id = window.location.pathname.split('/')[3];

  useEffect(() => {
    handleGetUser(id);
  }, []);

  if (loadingUser) return <Spinner />;

  return (
    <UserDetail
      user={user}
      handleUpdateUserInfo={handleUpdateUser}
      handleDeleteUser={handleDeleteUser}
    />
  );
};

export default UserDetailPage;
