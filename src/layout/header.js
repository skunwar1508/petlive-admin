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
              <Dropdown title="Specialization" icon="mdi:printer-primary" iconifyIcon="true">
                <Menu path="/specialization/primary/list/1"  title="Primary Specialization" />
                <Menu path="/specialization/secondary/list/1"  title="Secondary Specialization" />
              </Dropdown>
              {/* <Menu path="/specialization/primary/list/1"   title="Specialization" icon="mdi:printer-primary" iconifyIcon="true" /> */}
              <Menu path="/categories/list/1"  title="Lab Categories" icon="fontisto:laboratory" iconifyIcon="true" />
              <Menu path="/medicines/list/1"  title="Medicines" icon="game-icons:medicines" iconifyIcon="true" />
              <Menu path="/providers/list/1"  title="Providers Management" icon="vaadin:doctor" iconifyIcon="true" />
              <Menu path="/patients/list/1"  title="Patients Management" icon="flowbite:users-group-solid" iconifyIcon="true" />
              <Menu path="/appointment/list/1" title="Appointment Management" icon="mdi:calendar-check" iconifyIcon="true" />
              {/* <Menu path="/appointment/list/1"  title="Appointment" icon="mdi:flag" iconifyIcon="true" /> */}
              <Menu path="/treatments/list/1"  title="Treatment Management" icon="material-symbols:medical-services" iconifyIcon="true" />
              <Menu path="/templates/list/1"  title="Treatment Templates" icon="fluent:mail-template-24-filled" iconifyIcon="true" />
              <Menu path="/prescriptions/list/1"  title="Prescription Management" icon="material-symbols:prescriptions" iconifyIcon="true" />
              <Menu path="/article-category/list/1"  title="Articles Category" icon="mdi:category" iconifyIcon="true" />
              <Menu path="/articles/list/1"  title="Articles Management" icon="fluent-mdl2:articles" iconifyIcon="true" />
              <Menu path="/community/list/1"  title="Community Management" icon="oui:app-users-roles" iconifyIcon="true" />
              <Menu path="/flag/list/1"  title="Flag Management" icon="mdi:flag" iconifyIcon="true" />
              <Menu path="/payout/list/1"  title="Payout Management" icon="iconoir:hand-cash" iconifyIcon="true" />
              <Menu path="/refer-payout/list/1"  title="Referral Payout" icon="material-symbols:eye-tracking-sharp" iconifyIcon="true" />
              {/* <Menu path="/reporting-analytics/list/1"  title="Reporting and Analytics" icon="clarity:analytics-solid" iconifyIcon="true" /> */}
              <Menu path="/contacts/list/1"  title="Contact Us" icon="teenyicons:contact-outline" iconifyIcon="true" />
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
