import React, { useState } from 'react'
import Login from "./Login";
import Signup from "./Signup";

const LoginForm = () => {
    const [display, setDisplay] = useState("login") // state to track what to display
    const handleClick = () => {
        setDisplay(display === "login" ? "signup" : "login")
        console.log(display)
    }

    if (display === "login") {
        return (
            <div>
                <Login />
                <h1 onClick={() => handleClick()}>Don't have an account? Signup here!</h1>
            </div>

        )
    }
    else {
        return (
            <div>
                <Signup />
                <h1 onClick={() => handleClick()}>Already have an account? Login here!</h1>
            </div>
        )
    }
}

export default LoginForm
