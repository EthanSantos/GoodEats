import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const subscriptionKey = '451552f90c0b4542aa558ad22a6ca98d';
const endpoint = 'https://api.bing.microsoft.com/v7.0/images/search'

function getImage(input, callback) {
  console.log(input)
  const headers = {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
  };

  const params = {
    q: input, // search word
    count: 1,  // Retrieve only one result (the first image)
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `${endpoint}?${queryString}`;

  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      // Extract the URL of the first image
      const firstImageUrl = data.value[0].contentUrl;
      callback(firstImageUrl) // return the url
    })
    .catch(error => {
      console.error('Error fetching image data:', error);
    });
}

const MealCard = ({ meal, index }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    getImage(meal.name, (url) => {
      setImage(url);
    });
  }, [meal.name]);

  return (
    <Card
      style={{ width: 500, margin: '20px', display: 'flex', flexDirection: 'column' }}
      elevation={3}
    >
      {image && (
        <CardMedia
          component="img"
          height="400"
          image={image}
          alt={meal.name}
        />
      )}
      <CardContent style={{ flex: '1 0 auto' }}>
        <Typography gutterBottom variant="h5" component="div">
          {meal.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Calories: {meal.nutritional_facts.calories}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Protein: {meal.nutritional_facts.protein}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Fat: {meal.nutritional_facts.fat}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Carbohydrates: {meal.nutritional_facts.carbohydrates}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Cost: {meal.cost}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MealCard
