import React from 'react'

const Card = ({meal, index}) => {
    return (
        <div key={index}>
            <h2>{meal.name}</h2>
            <p>Calories: {meal.nutritional_facts.calories}</p>
            <p>Protein: {meal.nutritional_facts.protein}</p>
            <p>Fat: {meal.nutritional_facts.fat}</p>
            <p>Carbohydrates: {meal.nutritional_facts.carbohydrates}</p>
            <p>Cost: {meal.cost}</p>
        </div>
    )
}

export default Card
