import SidebarCategory from './sidebarCategory';
import SidebarPrice from './sidebarPrice';

function ShopcardSidebar() {
  return (
    <div className='shop_sidebar_area'>
      <SidebarCategory />
      <SidebarPrice />
    </div>
  );
}

export default ShopcardSidebar;
