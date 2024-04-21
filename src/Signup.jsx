import React, { useState } from 'react'
import { TextField, Button, Box, CssBaseline, ThemeProvider, Alert, createTheme } from '@mui/material';
import axios from 'axios';

const Signup = ({ errorMsg, setErrorMsg, handleSignupSuccess, setUserId, display, setDisplay }) => {
    const [info, setInfo] = useState({
        username: "",
        password: "",
    })

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
            const response = await axios.post('http://localhost:5000/signup-form', info);
            console.log(response.data); // Handle backend response
            setErrorMsg(response.data.message)
            if (response.data.message === "Created account.") {
                handleSignupSuccess();
                setUserId(response.data.id);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const handleClick = () => {
        setDisplay(display === "login" ? "signup" : "login")
        setErrorMsg(null)
        console.log(display)
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
                <div style={{ width: '50%', margin: '10% auto', backgroundColor: '#FFFFFF', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                    <>
                        <h1 style={{ fontFamily: 'Lexend, sans-serif', textAlign: 'center', paddingTop: '40px', marginBottom: '50px', color: '#65b5ff' }}>SIGN UP</h1>
                        <Box sx={{ minWidth: '100%', minHeight: '100%', background: 'lightblue' }}></Box>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
                            <form onSubmit={handleSubmit}>

                                <TextField
                                    variant="outlined"
                                    label="Username"
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    sx={{ backgroundColor: 'white' }}
                                />
                                <TextField
                                    variant="outlined"
                                    label="Password"
                                    type="password" // Use "password" type for password fields
                                    name="password"
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    sx={{ backgroundColor: 'white' }}
                                />
                                {errorMsg && (
                                    <Alert severity="error" sx={{ marginTop: '10px', width: '100%' }}>
                                        {errorMsg}
                                    </Alert>
                                )}
                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#65b5ff', marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '20px', padding: '10px 40px' }}>
                                    Sign up
                                </Button>
                            </form>

                        </div>
                        <p style={{ textAlign: 'center', paddingBottom: '50px' }}>Already have an account? <a href="/#"
                            onClick={handleClick}>Sign in</a></p>
                    </>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Signup
