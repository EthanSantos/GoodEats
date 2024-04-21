import React, { useState } from 'react'
import UserInput from "./UserInput";
import LoginForm from "./LoginForm";
import Generate from './Generate';

import { Button, Box } from '@mui/material';

function App() {
  const [display, setDisplay] = useState("login") // state to track what to display
  const [userId, setUserId] = useState();

  const logout = () => {
    setDisplay("login")
  }

  if (display === "user_input") {
    return (
      <div className="App">
        <Box position="absolute" top="20px" right="20px">
          <Button variant="contained" onClick={logout} sx={{ backgroundColor: '#aaa' }}>Logout</Button>
        </Box>
        <UserInput userId={userId} setDisplay={setDisplay} />
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
        <Box position="absolute" top="20px" right="20px">
          <Button variant="contained" onClick={logout} sx={{ backgroundColor: '#aaa' }}>Logout</Button>
        </Box>
        <Generate id={userId} setDisplay={setDisplay} />
      </div>
    )
  }

}

export default App;
