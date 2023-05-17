import React from "react";
import imgCart from "../../assets/img/core-img/cart.png";
import imgFav from "../../assets/img/core-img/favorites.png";
import imgSearch from "../../assets/img/core-img/search.png";
import { Link } from "react-router-dom";
import * as URL from "../../routes/url.js";

function NavSearch() {
  let qty = 0;

  return (
    <div className="cart-fav-search mb-100">
      <Link to={URL.CART} className="cart-nav">
        <img src={imgCart} alt="" /> Cart <span>({qty})</span>
      </Link>

      <a href="#" className="fav-nav">
        <img src={imgFav} alt="" /> Favourite
      </a>
      <a href="#" className="search-nav">
        <img src={imgSearch} alt="" /> Search
      </a>
    </div>
  );
}

export default NavSearch;
