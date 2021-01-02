import React from 'react'; 
import { Link } from 'react-router-dom';
import * as url from '../../helpers/url_helper';

const Sidebar = ({menu, location, redirect, logout}) => {
  const path = location.pathname.substring(1, location.pathname.length)
  const menuViews = menu.length ? (
    menu.map(itm => (
      <li className={`nav-item`} key={itm.name}>
        <Link to={itm.link}  className={`nav-link ${itm.name.toLowerCase() === path ? 'active' : itm.name.toLowerCase() === 'dashboard' && path === '' ? 'active' : ''}`}>
          <i className={`nav-icon fa ${itm.ico} `}></i>
          <p>
            { itm.name }
            {/* <span className="right badge badge-danger">New</span> */}
          </p>
        </Link>
      </li>
    ))
  ) : ([])
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <img src={`${url.ImageUrl}/AdminLTELogo.png`}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{opacity: .8}} />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={`${url.ImageUrl}/user2-160x160.jpg`} className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <a href="#" className="d-block">Alexander Pierce</a>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            { menuViews }
            <li className={`nav-item pointer`} key={`logout`}>
              <a  className={`nav-link `} onClick={logout}>
                <i className={`nav-icon fa fa-sign-out `}></i>
                <p>
                  Logout
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar