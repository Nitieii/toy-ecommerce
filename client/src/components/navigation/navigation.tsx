import React from "react";
import NavLogo from "./navLogo";
import NavBar from "./navBar";
import NavSearch from "./navSearch";
import NavSocial from "./navSocial";

Navigation.propTypes = {};
function Navigation() {
  return (
    <header className="header-area clearfix">
      <NavLogo />
      <NavBar />

      <NavSearch />
      <NavSocial />
    </header>
  );
}

export default Navigation;
