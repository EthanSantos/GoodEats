import React, {useState} from 'react'
import axios from 'axios';

const Login = () => {
    const [info, setInfo] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInfo((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(info)

        try {
            const response = await axios.post('http://localhost:5000/login-form', info);
            console.log(response.data); // Handle backend response
          } catch (error) {
            console.error('Error:', error);
          }
        
    }

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit = {handleSubmit}>
            <h3>Username: </h3> <input type="text" name="username" onChange={handleChange}/>
            <h3>Password: </h3> <input type="text" name="password" onChange={handleChange}/>
            <button type ="submit">Login</button>
        </form>
    </div>
  )
}

export default Login
