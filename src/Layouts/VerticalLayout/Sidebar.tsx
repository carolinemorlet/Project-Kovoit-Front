import React from 'react';
import { Link } from 'react-router-dom';

//import components
import SidebarContent from './SidebarContent';

//import images
import logo from '../../assets/images/kovoit.png';

const Sidebar = (props: any) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/dashboard" className="logo logo-light">
            <span className="logo-lg">
              <img src={logo} alt="" height="100" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== 'condensed' ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
