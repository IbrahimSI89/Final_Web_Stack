// Purpose:
//      A layout component that uses React Router's Outlet to render nested routes.




// How It Works:
//        The Layout component serves as a wrapper for pages,
//  rendering the appropriate child component based on the current route.







//React Router: Uses Outlet to render child routes within the layout.
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
