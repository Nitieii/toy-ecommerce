import React from "react";

import SubscribeForm from "../components/newsletters/subscribeForm";
import FooterMain from "../components/footer/footerMain";

const Footer = () => {
  return (
    <div style={{ width: "100vw" }}>
      <SubscribeForm />
      <FooterMain />
    </div>
  );
};

export default Footer;
