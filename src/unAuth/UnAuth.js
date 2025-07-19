

import React, {Suspense, useContext, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import NotFound from '../components/notFound/notFound';
import { UserContext } from '../context/theme';
import Login from '../pages/login';


function UnAuth() {
  const context = useContext(UserContext)

  
  return (
    <>
    <div className={`page-wrapper ${context.Theme} ${context.ThemeColor} pageLogin`}>
    <div className="login-wrapper d-flex">
   
     
   
            <Suspense fallback={'loading'}>
              <Routes>
               
                <Route path="*" element={<Login/>}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
       
        </>
    
  );
}

export default UnAuth;
