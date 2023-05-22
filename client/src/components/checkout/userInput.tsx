import React from 'react';
import UserFirstName from './user/userFirstName';
import UserLastName from './user/userLastName';
import UserCompany from './user/userCompany';
import UserEmail from './user/userEmail';
import UserCountrySelect from './user/userCountrySelect';
import UserStreet from './user/userStreet';
import UserCity from './user/userCity';
import UserZipCode from './user/userZipCode';
import UserPhone from './user/userPhone';
import UserComment from './user/userComment';
import UserCheckboxes from './user/userCheckboxes';

function UserInput(props) {
  return (
    <div className='col-12 col-lg-8'>
      <div className='checkout_details_area mt-50 clearfix'>
        <div className='cart-title'>
          <h2>Checkout</h2>
        </div>

        <form action='#' method='post'>
          <div className='row'>
            <UserFirstName />
            <UserLastName />
            <UserCompany />
            <UserEmail />
            <UserCountrySelect />
            <UserStreet />
            <UserCity />
            <UserZipCode />
            <UserPhone />
            <UserComment />
            <UserCheckboxes />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserInput;
