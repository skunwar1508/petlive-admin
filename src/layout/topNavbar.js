import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DateFormate from '../components/dateFormate';
import { UserContext } from '../context/theme';
import { PageName } from './headerBreadcrumbs';
// import { IMAGE_URL } from "../services/api-url";
// import FormBlock from '../components/form/FormBlock';
// import AddSub from '../services/add-sub';
// import Modal from 'react-bootstrap/Modal';
// import ReqCall from '../services/reqCall';
// import { Dropdown } from 'react-bootstrap';

const Notification = [
    {
        Avatar: '/assets/images/avatar-3.jpg',
        Name: "John Doe",
        Description: "Lorem ipsum dolor sit amet,consectetuer elit.",
        NotificDate: "02 Jan 2022"
    },
    {
        Avatar: '/assets/images/avatar-3.jpg',
        Name: "Tailor",
        Description: "Lorem ipsum dolor sit amet,consectetuer elit.",
        NotificDate: "03 Jan 2022"
    },
    {
        Avatar: '/assets/images/avatar-3.jpg',
        Name: "Cherrry Warner",
        Description: "Lorem ipsum dolor sit amet,consectetuer elit.",
        NotificDate: "4 Jan 2022"
    }
]

const Setting = [
    // {
    //     title : "Profile",
    //     icon : "icon-user",
    //     to : "/profile"
    // },

    {
        title: "Change Password",
        icon: "icon-key",
        to: "/change-password",
    },
    //   {
    //     title : "Setting",
    //     icon : "icon-settings",
    //     to : "/settings"
    // },

    // {
    //     title : "Messages",
    //     icon : "icon-mail",
    //     to : "/"
    // },
    {
        title: "Logout",
        icon: "icon-log-out",
        to: "/"
    },
]




function TopNavbar() {
    const { userInfo, socket, notificationData, setNotificationData, MiniSidebar, setMiniSidebar, setAuth } = useContext(UserContext);
    const { id } = socket

    // const [call, setCall] = useState(false);
    // const context = useContext(UserContext)
    const [isActive, setActive] = useState(false);

    const ToggleClass = () => {
        setActive(!isActive);
    }
    // function ToggleSidebar(){
    //     context.setMiniSidebar(!context.MiniSidebar);
    // }
    useEffect(() => {
        // console.log(socket)setSocket(connection)
        if (id) {
            socket.emit("panelNotifications", {});
            socket.on('panelNotifications', (data) => {
                // console.log(id);
                setNotificationData(data || [])
                // console.log('panelNotifications', data)
            })

        }
    }, [id]);
    // console.log(notificationData) 
    const Logout = () => {
        localStorage.removeItem("token");
        setAuth(false);
    }
    return (

        <nav className="navbar header-navbar" >
            {/* <Modal show={call} onHide={()=>setAdd(false)} animation={false}>
      <div className="card-body profilecategory addtablemodal rounded-3 ">
      <div className='Mobile_menuClose closeiconAdd'>
					<i className="fa-solid fa-xmark" onClick={()=>setCall(false)}></i>
					</div>
      <div className='wrap_log__form bank-detailsForm'>
                   
   <FormBlock {...ReqCall}/>
           </div>
           </div>
       
      </Modal>  */}
            <div className="navbar-wrapper w-100">
                <div className="navbar-container container-fluid">
                    <div className="row w-100 align-items-center">
                        <div className="col-3">
                            <div className="nav-left mr-auto d-flex justify-content-start">
                                <div className="menu-hamburger ml-1 fs-5">
                                    <span className='bredcrumHead'>
                                        <PageName />
                                    </span>


                                </div>
                                <div className="slideUp_header  ml-1 fs-5">
                                    <span className="icon-arrow-up"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <ul className="nav-right d-flex align-items-center justify-content-end mb-0">
                                <li className="header-notification pr-5">
                                    <Dropdown show={isActive}>
                                        {/* <Link to="/notifications" id="notificaitonBell"                                            >
                                            <i className="feather icon-bell"></i>
                                            {notificationData?.length>0 && (<span className="badge bg-danger rounded-circle position-absolute">{notificationData?.length >= 9 ? '9+' : notificationData?.length }</span>)}
                                    </Link> */}
                                        {/* <div className="dropdown-toggle position-relative" onClick={ToggleClass} type="button" id="notificaitonBell"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="feather icon-bell"></i>
                                            {notificationData?.length>0 && (<span className="badge bg-danger rounded-circle position-absolute">{notificationData?.length >= 9 ? '9+' : notificationData?.length }</span>)}
                                    </div> */}
                                        {/* <Dropdown.Menu align={"end"}>
                                        <li className="p-3 d-flex align-items-center justify-content-between">
                                                    <h6>Notifications</h6>
                                                    <label className="badge fw-normal bg-warning rounded">New</label>
                                                </li>
                                                {
                                                notificationData.map((item,i) => (
                                                    <ul>
                                                    <li key={i}>
                                                        <div className="media d-flex align-items-center">
                                                            {/* <img className="flex-shrink-0 rounded-circle img-fluid" src={item.Avatar}
                                                                alt="Generic placeholder"/> */}
                                        {/* <div className="media-body flex-shrink-1">
                                                                {/* <h5 className="notification-user">{item.content}</h5> */}
                                        {/* <p className="notification-msg">{item.content}</p>
                                                                <span className="notification-time"><DateFormate>{item.createdAt}</DateFormate></span>
                                                            </div> */}
                                        {/* </div> 
                                                    </li>
                                                    </ul>                                                    
                                                    ))
                                                } */}
                                        {/* <Link to="/notifications" className='notifAll'>
                                                    All
                                                </Link>
                                    </Dropdown.Menu> */}
                                    </Dropdown>
                                    {/* <div className="dropdown-primary dropdown">
                                        
                                        <ul className={isActive ? "dropdown-menu dropdown-menu-end" : "dropdown-menu dropdown-menu-end show"}
                                                aria-labelledby="notificaitonBell">
                                                
                                            </ul>
                                    </div> */}
                                </li>

                                {/* Notification */}
                                {/* <li className="header-notification pr-5">
                                        <div className="dropdown-primary dropdown">
                                            <div className="dropdown-toggle position-relative" onClick={ToggleClass} type="button" id="notificaitonBell"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="feather icon-bell"></i>
                                                <span className="badge bg-danger rounded-circle position-absolute">5</span>
                                            </div>
                                            <ul className={isActive ? "dropdown-menu dropdown-menu-end" : "dropdown-menu dropdown-menu-end show"}
                                                aria-labelledby="notificaitonBell">
                                                <li className="p-3 d-flex align-items-center justify-content-between">
                                                    <h6>Notifications</h6>
                                                    <label className="badge fw-normal bg-warning rounded">New</label>
                                                </li>
                                                {
                                                Notification.map((item,i) => (
                                                    <li className="px-3 mb-3 py-1" key={i}>
                                                        <div className="media d-flex align-items-center">
                                                            <img className="flex-shrink-0 rounded-circle img-fluid" src={item.Avatar}
                                                                alt="Generic placeholder"/>
                                                            <div className="media-body flex-shrink-1 pl-3">
                                                                <h5 className="notification-user">{item.Name}</h5>
                                                                <p className="notification-msg">{item.Description}</p>
                                                                <span className="notification-time">{item.NotificDate}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li> */}


                                {/* User profile  */}
                                {/* <div className='foodiaButn callBack text-center'>
                       <button type='submit' className='mt-3 btn-theme btn-custom' onClick={()=>setCall(true)}> <span><i className="fa-sharp fa-solid fa-headset"></i>  Request Call Back</span></button>

                       </div> */}
                                {/* <div className='foodiaButn callBack text-center'>
                       <Dropdown>
                      <Dropdown.Toggle  id="dropdown-basic">
                      <i className="fa-solid fa-headset"></i>  Request Call Back  <i className="fa-solid fa-angle-down"></i>
                      </Dropdown.Toggle>

                     <Dropdown.Menu>
                     <Dropdown.Item onClick={()=>setCall(true)}>Generate New Request</Dropdown.Item>
                     <Dropdown.Item href="/view-request">View All Request</Dropdown.Item>
                     </Dropdown.Menu>
                     </Dropdown>
                     </div> */}
                                {/* <div className='notificationBell'>
                        <div className='notification'>9+</div>
                        <Link to='/notifications'>
                          
                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.7267 11.0468C12.6706 10.9754 12.6154 10.9039 12.5613 10.835C11.8171 9.88464 11.3669 9.31107 11.3669 6.62071C11.3669 5.22786 11.0513 4.085 10.4293 3.22786C9.97059 2.59464 9.35057 2.11429 8.53334 1.75929C8.52283 1.75311 8.51344 1.74501 8.50561 1.73536C8.21166 0.696071 7.40729 0 6.50008 0C5.59288 0 4.78885 0.696071 4.4949 1.73429C4.48706 1.74358 4.4778 1.75143 4.4675 1.7575C2.56041 2.58643 1.63359 4.17679 1.63359 6.61964C1.63359 9.31107 1.18405 9.88464 0.439207 10.8339C0.385086 10.9029 0.32995 10.9729 0.273799 11.0457C0.128755 11.2304 0.036858 11.4551 0.00898311 11.6932C-0.0188918 11.9313 0.0184225 12.1729 0.11651 12.3893C0.325214 12.8536 0.770022 13.1418 1.27774 13.1418H11.7261C12.2315 13.1418 12.6733 12.8539 12.8826 12.3918C12.9812 12.1753 13.0188 11.9336 12.9912 11.6952C12.9635 11.4568 12.8718 11.2318 12.7267 11.0468ZM6.50008 16C6.98888 15.9996 7.46845 15.8595 7.88794 15.5946C8.30743 15.3297 8.65119 14.9498 8.88276 14.4954C8.89367 14.4736 8.89906 14.4492 8.8984 14.4246C8.89775 14.3999 8.89107 14.3759 8.87902 14.3548C8.86697 14.3337 8.84995 14.3162 8.82963 14.3041C8.8093 14.292 8.78636 14.2857 8.76302 14.2857H4.23783C4.21446 14.2856 4.19147 14.2919 4.1711 14.304C4.15073 14.3161 4.13367 14.3335 4.12157 14.3546C4.10948 14.3758 4.10278 14.3998 4.1021 14.4245C4.10143 14.4491 4.10682 14.4735 4.11774 14.4954C4.34929 14.9498 4.693 15.3296 5.11242 15.5945C5.53185 15.8594 6.01135 15.9995 6.50008 16Z" fill="white"/>
                                    </svg>


                        </Link>
                        
                       
                       </div> */}


                                <li className="user-profile header-notification">
                                    <div className="dropdown-primary dropdown">
                                        <div className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={`${userInfo.userImage?.fullUrl || '/assets/images/default_user.jpg'}`} className="img-radius img-fluid" alt="User-Profile" />
                                            {/* <span>{userInfo.name}</span> */}

                                            <i className="fa-solid fa-angle-down"></i>
                                        </div>
                                        <ul className="show-notification dropdown-menu-end profile-notification dropdown-menu"
                                            data-dropdown-in="fadeIn" data-dropdown-out="fadeOut" aria-labelledby="dropdownMenuLink">
                                            {
                                                Setting.map((item, i) => (
                                                    item.title == 'Logout' ? (
                                                        <li key={i}>
                                                            <a onClick={() => Logout()}>
                                                                <i className={item.icon}></i> {item.title}
                                                            </a>
                                                        </li>
                                                    ) : (
                                                        <li key={i}>
                                                            <Link to={item.to}>
                                                                <i className={item.icon}></i> {item.title}
                                                            </Link>
                                                        </li>
                                                    )
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default TopNavbar;