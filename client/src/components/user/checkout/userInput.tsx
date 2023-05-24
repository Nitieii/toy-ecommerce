import UserFirstName from './user/userFirstName.tsx';
import UserCompany from './user/userCompany.tsx';
import UserEmail from './user/userEmail.tsx';
import UserCountrySelect from './user/userCountrySelect.tsx';
import UserStreet from './user/userStreet.tsx';
import UserZipCode from './user/userZipCode.tsx';
import UserPhone from './user/userPhone.tsx';
import UserComment from './user/userComment.tsx';

function UserInput() {
  return (
    <div className='col-12 col-lg-8'>
      <div className='checkout_details_area mt-50 clearfix'>
        <div className='cart-title'>
          <h2>Checkout</h2>
        </div>

        <form action='#' method='post'>
          <div className='row'>
            <UserFirstName />
            <UserCompany />
            <UserEmail />
            <UserCountrySelect />
            <UserStreet />
            <UserZipCode />
            <UserPhone />
            <UserComment />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserInput;
