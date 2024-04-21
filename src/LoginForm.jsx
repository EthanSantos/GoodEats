import React, { useState } from 'react'
import Login from "./Login";
import Signup from "./Signup";

const LoginForm = ({display, setDisplay, setUserId}) => {
    const [errorMsg, setErrorMsg] = useState()

    const handleLoginSuccess = () => {
        setDisplay("generate")
    }

    const handleSignupSuccess = () => {
        setDisplay("user_input")
    }

    if (display === "login") {
        return (
            <div>
                <Login errorMsg = {errorMsg} setErrorMsg = {setErrorMsg} handleLoginSuccess = {handleLoginSuccess} setUserId = {setUserId} display = {display} setDisplay = {setDisplay}/>
            </div>

        )
    }
    else {
        return (
            <div>
                <Signup errorMsg = {errorMsg} setErrorMsg = {setErrorMsg} handleSignupSuccess = {handleSignupSuccess} setUserId = {setUserId} display = {display} setDisplay = {setDisplay}/>
            </div>
        )
    }
}

export default LoginForm
