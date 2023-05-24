import SearchBar from '../components/layouts/navigation/searchBar';
import MobileNav from '../components/layouts/mobile/mobileNav';
import Navigation from '../components/layouts/navigation/navigation';

const Header = () => {
  return (
    <>
      <SearchBar />

      <MobileNav />

      <Navigation />
    </>
  );
};

export default Header;
