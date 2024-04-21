import React, { useState } from 'react'
import axios from 'axios';

import { Button, Box, CssBaseline, ThemeProvider, TextField } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const UserInput = ({ userId, setDisplay }) => {
  const [info, setInfo] = useState({
    id: userId,
    height: "",
    weight: "",
    desiredWeight: "",
    age: "",
    budget: "",
  })

  const [errorMsg, setErrorMsg] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(info)

    try {
      const response = await axios.post('http://localhost:5000/info-form', info);
      console.log(response.data); // Handle backend response
      setErrorMsg(response.data.message)
      // display generate meal plan
      setDisplay("generate")
    } catch (error) {
      console.error('Error:', error);
    }

  }

  const theme = createTheme({
    palette: {
      background: {
        default: '#65b5ff',
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ width: '30%', margin: '5% auto', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>
          <>
            <h1 style={{ fontFamily: 'Lexend, sans-serif', paddingTop: '40px', marginBottom: '50px', color: '#65b5ff' }}>EDIT STATISTICS</h1>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                  variant="outlined"
                  label="Height"
                  type="text"
                  name="height"
                  onChange={handleChange}
                  sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                />
                <TextField
                  variant="outlined"
                  label="Weight"
                  type="text"
                  name="weight"
                  onChange={handleChange}
                  sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                />
                <TextField
                  variant="outlined"
                  label="Desired Weight"
                  type="text"
                  name="desiredWeight"
                  onChange={handleChange}
                  sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                />
                <TextField
                  variant="outlined"
                  label="Age"
                  type="text"
                  name="age"
                  onChange={handleChange}
                  sx={{ width: '100%', backgroundColor: 'white', marginBottom: '20px' }}
                />
                <TextField
                  variant="outlined"
                  label="Budget"
                  type="text"
                  name="budget"
                  onChange={handleChange}
                  sx={{ width: '100%', backgroundColor: 'white', marginBottom: '40px' }}
                />
                <Button type="submit" variant="contained" sx={{ backgroundColor: '#65b5ff', width: '70%', marginBottom: '20px' }}>Submit</Button>
                <p>{errorMsg}</p>
              </form>
            </Box>
          </>
        </div>
      </ThemeProvider>
    </div>
  );

}

export default UserInput
