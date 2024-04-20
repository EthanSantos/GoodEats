import React, {useState} from 'react'
import axios from 'axios';

const UserInput = () => {
    const [info, setInfo] = useState({
        height: "",
        weight: "",
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
            const response = await axios.post('http://localhost:5000/submit-form', info);
            console.log(response.data); // Handle backend response
          } catch (error) {
            console.error('Error:', error);
          }
        
    }

  return (
    <div>
        <form onSubmit = {handleSubmit}>
            <h3>Height: </h3> <input type="text" name="height" onChange={handleChange}/>
            <h3>Weight: </h3> <input type="text" name="weight" onChange={handleChange}/>
            <button type ="submit">Submit</button>
        </form>
    </div>
  )
}

export default UserInput
