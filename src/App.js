import React, { useState } from 'react'
import UserInput from "./UserInput";
import LoginForm from "./LoginForm";
import Generate from './Generate';

function App() {
  const [display, setDisplay] = useState("login") // state to track what to display
  const [userId, setUserId] = useState();

  const logout = () => {
    setDisplay("login")
  }

  if (display === "user_input") {
    return (
      <div className="App">
        <UserInput userId={userId} setDisplay={setDisplay} />
        <button onClick={logout}>Logout</button>
      </div>
    )
  }
  else if (display === "login" || display === "signup") {
    return (
      <div className="App">
        <LoginForm display={display} setDisplay={setDisplay} setUserId={setUserId} />
      </div>
    )
  }
  else if (display === "generate") {
    return (
      <div>
        <Generate id={userId} setDisplay={setDisplay} />
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

}

export default App;
