import SearchBar from '../components/navigation/searchBar';
import MobileNav from '../components/mobile/mobileNav';
import Navigation from '../components/navigation/navigation';

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
