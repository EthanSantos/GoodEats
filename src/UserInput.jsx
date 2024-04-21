import React, { useState } from 'react'
import axios from 'axios';

const UserInput = ({ userId }) => {
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
    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Height: </h3> <input type="text" name="height" onChange={handleChange} />
        <h3>Weight: </h3> <input type="text" name="weight" onChange={handleChange} />
        <h3>Weight goal: </h3> <input type="text" name="desiredWeight" onChange={handleChange} />
        <h3>Age: </h3> <input type="text" name="age" onChange={handleChange} />
        <h3>Budget: </h3> <input type="text" name="budget" onChange={handleChange} />
        <button type="submit">Submit</button>
        <p>{errorMsg}</p>
      </form>
    </div>
  )
}

export default UserInput
