import React, { useState } from 'react'
import Login from "./Login";
import Signup from "./Signup";

const LoginForm = ({display, setDisplay, setUserId}) => {
    const [errorMsg, setErrorMsg] = useState()
    
    const handleClick = () => {
        setDisplay(display === "login" ? "signup" : "login")
        setErrorMsg(null)
        console.log(display)
    }

    const handleLoginSuccess = () => {
        setDisplay("generate")
    }

    const handleSignupSuccess = () => {
        setDisplay("user_input")
    }

    if (display === "login") {
        return (
            <div>
                <Login errorMsg = {errorMsg} setErrorMsg = {setErrorMsg} handleLoginSuccess = {handleLoginSuccess} setUserId = {setUserId}/>
                <h1 onClick={() => handleClick()}>Don't have an account? Signup here!</h1>
            </div>

        )
    }
    else {
        return (
            <div>
                <Signup errorMsg = {errorMsg} setErrorMsg = {setErrorMsg} handleSignupSuccess = {handleSignupSuccess} setUserId = {setUserId}/>
                <h1 onClick={() => handleClick()}>Already have an account? Login here!</h1>
            </div>
        )
    }
}

export default LoginForm
