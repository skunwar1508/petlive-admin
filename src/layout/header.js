import React, { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import DropDownMenu, { Dropdown, Menu } from "../components/common/sidebarMenu";
import { UserContext } from "../context/theme";

function Header() {
  const { reset, counts } = useContext(UserContext);
  return (
    <>
      <div className="left-sidebar-wrapper">
        <nav className="sidebar">
          <div className="sidebar-header text-center">
            <NavLink activeclassname="isActive" to="/">
              LG ADMIN
            </NavLink>
            <strong>
              <NavLink activeclassname="isActive" to="/">
              LG
              </NavLink>
            </strong>
          </div>
          <div className="left-nav-menu">
            <DropDownMenu>
              <Menu path="/"  title="Dashboard" icon="material-symbols:dashboard" iconifyIcon="true" />
              {/* <Dropdown title="Specialization" icon="mdi:printer-primary" iconifyIcon="true">
                <Menu path="/specialization/primary/list/1"  title="Primary Specialization" />
                <Menu path="/specialization/secondary/list/1"  title="Secondary Specialization" />
              </Dropdown> */}
              {/* <Menu path="/specialization/primary/list/1"   title="Specialization" icon="mdi:printer-primary" iconifyIcon="true" /> */}
              <Menu path="/patients/list/1"  title="User Management" icon="flowbite:users-group-solid" iconifyIcon="true" />
              <Menu path="/doctor/list/1"  title="Vet Management" icon="vaadin:doctor" iconifyIcon="true" />
              <Menu path="/services/list/1"  title="Services Management" icon="vaadin:doctor" iconifyIcon="true" />
            </DropDownMenu>
            <ul>
              <li>
                <a title="Logout" onClick={() => reset()}>
                  <span className="icon-log-out"></span>
                  <span className="menu_txt">Logout</span>
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="version">
                <span className="vs-mobile">LT-M-22</span>
                <span className="vs-web">V LT-MAR-22</span>
            </div> */}
        </nav>
      </div>
    </>
  );
}
export default Header;
