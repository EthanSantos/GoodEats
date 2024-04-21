import React, {useState} from 'react'
import axios from 'axios';

import Card from './Card';

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyDgo7iG_GdSy_a1Norjk2vAqobRvtcYL5g");

async function generateAI(data) {
    // For text-only input, use the gemini-pro model
    console.log("running")
    let age = data[0].age
    let budget = data[0].budget
    let desiredWeight = data[0].desiredWeight
    let height = data[0].height
    let weight = data[0].weight

    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig: {temperature: 1}});

    const prompt = `In JSON format, give me 3 meals. I'm currently ${height} tall, ${weight} pounds, ${age} years old, and my goal is to weigh ${desiredWeight} pounds in a year. I have a budget of ${budget} dollars to spend. Please provide nutritional facts for each one. Put it in this JSON format: 
[{ "name": "Write the name of each meal. Give a real life example.", "nutritional_facts": { "calories": 480, "protein": "20g", "fat": "15g", "carbohydrates": "60g" }, "cost": "$5" }] 
Here is an example of the type of response I want. [{"name":"Oatmeal with Berries and Nuts","nutritional_facts":{"calories":400,"protein":"15g","fat":"10g","carbohydrates":"60g"},
"cost":"$3"},{"name":"Chicken Salad Sandwich on Whole Wheat Bread","nutritional_facts":{"calories":500,"protein":"30g","fat":"15g","carbohydrates":"65g"},"cost":"$5"},
{"name":"Grilled Salmon with Roasted Vegetables and Brown Rice","nutritional_facts":{"calories":550,"protein":"40g","fat":"20g","carbohydrates":"70g"},"cost":"$7"}]`;
    console.log(prompt)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

const Generate = ({ id, setDisplay}) => {
    // handle generate ai

    const [mealData, setMealData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log(id)
            const response = await axios.get('http://localhost:5000/generate-form', {
                params: {
                    id: id  // Pass the number (1 in this case) as a query parameter
                }
            });
            console.log(response.data); // Handle backend response
            const data = await generateAI(response.data)
            console.log(data)
            setMealData(JSON.parse(data))
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const editStats = () => {
        setDisplay("user_input")
    }

    return (
        <div>
            <button onClick={handleSubmit}>Generate</button>
            <button onClick={editStats}>Edit stats</button>

            <div>
                <h1>Meal List</h1>
                {mealData.map((meal, index) => (
                    <Card meal = {meal} index = {index}/>
                ))}
            </div>
            
        </div>
    )
}

export default Generate
