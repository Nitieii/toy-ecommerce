import React from "react";
import image from "../../assets/img/core-img/logo.png";
import { Link } from "react-router-dom";
import * as URL from "../../routes/url";

function NavLogo() {
  return (
    <div className="logo">
      <Link to={URL.ROOT}>
        <img src={image} alt="" />
      </Link>
    </div>
  );
}

export default NavLogo;
