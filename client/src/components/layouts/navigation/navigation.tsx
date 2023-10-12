import NavBar from './navBar.tsx';
import NavSearch from './navSearch.tsx';
import NavSocial from './navSocial.tsx';
import NavLogo from './navLogo.tsx';

function Navigation() {
  const { isAdmin } = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className='header-area clearfix'>
      <NavLogo />
      <NavBar />
      {!isAdmin ? (
        <>
          <NavSearch /> <NavSocial />
        </>
      ) : null}
    </header>
  );
}

export default Navigation;
