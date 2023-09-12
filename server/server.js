const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// This displays a message that the server is running and listening on the specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// Create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'You are CONNECTED!' });
});

  // Get Meals Random Auto Choice
app.get('/getRandomMeal', (req, res) => {
  res.send('https://www.themealdb.com/api/json/v1/1/random.php');
});

// Get Cocktail Random Auto Choice
app.get('/getRandomMeal', (req, res) => {
  res.send('https://www.thecocktaildb.com/api/json/v1/1/random.php');
});

// GET Global API Results On serveless netlify
app.get('/isAlive', (req, res) => {
  res.json({ isAlive: "true"});
});

// GET Where
app.get('/place', (req, res) => {
  res.json({'places':['AtHome','In restaurante','In Car','Somewhere','In Sofa','In the street','In park']});
});

// GET What to do
app.get('/activity', (req, res) => {
  res.json({ 'activity':['Walk','Movie','Chat in the balcony','Play a game','Talk about a book','Drink wine','Dinner with Friends','Go Camping/ PicNic','Explore a new place','Cinema','Theater']});
});

// GET Sexy Positions
app.get('/sexytime', (req, res) => {
  res.json({'sexytime': ['Go With the Flow','A new place','the usual','Numbers','The Boat','ReverseCowGirl','The Lap Dance','The Pancake','On her', 'On him']});
});

// GET Style entertainment 
app.get('/entertainment', (req, res) => {
  res.json({'entertainment': ['Drama','Action','Franch','Family','MOST Viewed','In Cinema','The first come up on mind','Comedy']});
});