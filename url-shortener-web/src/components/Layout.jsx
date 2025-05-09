// components/Layout.js
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 p-0">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10 p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
