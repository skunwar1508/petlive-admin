import React, { useContext } from 'react';
import LoginForm from '../components/login/loginForm';
import { UserContext } from '../context/theme';


const Login = () => {
    const context = useContext(UserContext)
    return (


        <div className="Form__mainContain">
            <LoginForm />
        </div>




    )
}

export default Login
