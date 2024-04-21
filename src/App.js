import React, { useState } from 'react'
import UserInput from "./UserInput";
import LoginForm from "./LoginForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState();

  if (loggedIn) {
    return (
      <div className="App">
        <UserInput userId = {userId}/>
      </div>
    )
  }
  else {
    return (
      <div className="App">
        <LoginForm setLoggedIn={setLoggedIn} setUserId={setUserId}/>
      </div>
    )
  }

}

export default App;
