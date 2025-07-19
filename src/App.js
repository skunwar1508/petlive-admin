// import logo from './logo.svg';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import React,{useEffect, useState} from 'react';
import { UserContext, UserProvider } from "./context/theme";
import Layout from "./layout/layout";
// import Login from "./pages/login";
import 'react-toastify/dist/ReactToastify.css';
// import Register from "./pages/register";
import UnAuth from "./unAuth/UnAuth";
import 'rc-tooltip/assets/bootstrap_white.css';

function App() {


  return (
    <>
      <UserProvider>
        <UserContext.Consumer>
          {({auth}) => (
            auth ? <Layout /> : <UnAuth/> 
          )}
        </UserContext.Consumer>
      </UserProvider>
    </>
  );
}

export default App;
