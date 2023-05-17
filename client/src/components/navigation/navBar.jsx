import React, { useState, useEffect } from "react";
import * as URL from "../../routes/url";

// Get the current location.

function NavBar(props) {
  const [location, setLocation] = useState("/");

  return (
    <nav className="amado-nav">
      <ul>
        <li className={location == "/" ? "active" : ""}>
          <a href={URL.ROOT}>Home</a>
        </li>
        <li className={location == "/shop" ? "active" : ""}>
          <a href={URL.SHOP}>Shop</a>
        </li>
        {/*<li><a href={ URL.DETAILS }>Product</a></li>*/}
        <li className={location == "/cart" ? "active" : ""}>
          <a href={URL.CART}>Cart</a>
        </li>
        <li className={location == "/checkout" ? "active" : ""}>
          <a href={URL.CHECKOUT}>Checkout</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
