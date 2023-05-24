import SubscribeForm from '../components/layouts/newsletters/subscribeForm';
import FooterMain from '../components/layouts/footer/footerMain';

const Footer = () => {
  return (
    <div style={{ width: '100vw' }}>
      <SubscribeForm />

      <FooterMain />
    </div>
  );
};

export default Footer;
