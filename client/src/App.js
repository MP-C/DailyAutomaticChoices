import React, {useEffect, useState} from 'react';
import './App.css';

function App(){
  const [meals, setMeals] = useState([])
  const [backendStart, setBackendStart] = useState('')
  const [place, setPlace] = useState([])
  const [activity, setActivity] = useState([])
  const [sexyTime, setSexyTime] = useState([])
  const [styleRandom, setStyleRandom] = useState([])

  // Check BackEnd Status
  useEffect(() => {
    fetch("/express_backend")
      .then(response => response.json())
      .then(data => {setBackendStart(data.express)}
    )
  },[])
  
  // Get Meals Auto Choice
  const showAlertFood = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => displayFoods(data.meals))
    }
    
    const displayFoods = (foods) => {
      const mealElements = foods.map((food, index) => (
        <div key={index}>
          <p>Choice: {food.strArea} </p>
          <p>(optional: {food.strMeal})</p>
          <p>Category: {food.strCategory}</p>
        </div>
      ));
      setMeals(mealElements);
    };
  
  // Get place
  const showAlertPlace = () =>{
      fetch("/place")
        .then(response => response.json())
        .then(data => displayPlace(data.places)); // Use data.places here
    };
    
    const displayPlace = (places) => {
      var placeRandom = getRandomItem(places);
      setPlace(placeRandom);
    };

  // Get activity
  const showAlertActivity = () => {
    fetch("/activity")
      .then(response => response.json())
      .then(data => displayActivity(data.activity)); // Use data.activities here
  };

  const displayActivity = (activities) => {
    var activityRandom = getRandomItem(activities);
    setActivity(activityRandom);
  }

    // Get sexyTime
    const showAlertSexyTime = () => {
      fetch("/sexytime")
        .then(response => response.json())
        .then(data => displaySexyTime(data.sexytime)); // Use data.sexy here
    };

    const displaySexyTime = (positions) =>{
      var sexyRandom = getRandomItem(positions);
      setSexyTime(sexyRandom);
    };

    // Get entertainment 
    const showAlertType = () => {
      fetch("/typemovie")
        .then(response => response.json())
        .then(data => displayType(data.typemovie)); // Use data.sexy here
    };

    const displayType = (styles) =>{
      var styleRandom = getRandomItem(styles);
      setStyleRandom(styleRandom);
    };

    // Get Random item
    function getRandomItem(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }
  
  return(
    <div class='body'>
      <div class='headerInfo'>
        {typeof backendStart === "string" && backendStart === "" ? (<p>loading..</p>) : (<p> {backendStart} </p>)}
      </div>
      <div class='groupChoices'>
        <div class='randomChoices'>
          <div class='zone'>
            <div class='randomBottom'>
              <button class='typeBottom' onClick={showAlertFood}> Choose a Meal</button>
            </div>
            <div class='card'>
              { meals== null ? <p> Click to chose </p> : <p>{meals}</p>}
            </div>
          </div>

          <div class='zone'>
            <div class='randomBottom'>
              <button class='typeBottom' onClick={showAlertPlace}> Choose a place</button>
            </div>       
            <div class='card'>
              { place== null ? <p> Click to chose </p> : <p>{place}</p>}
            </div>
          </div>

          <div class='zone'>
            <div class='randomBottom'>
              <button class='typeBottom' onClick={showAlertActivity}> Choose an activity </button>
            </div>
            <div class='card'>
              { activity == null ? <p> Click to chose </p> : <p>{activity}</p>}
            </div>
          </div>

          <div class='zone'>
            <div class='randomBottom'>
              <button class='typeBottom' onClick={showAlertType}> Choose type the entertainment </button>
            </div>
            <div>
              <div class='card'>
                { activity == null ? <p> Click to chose </p> : <p>{styleRandom}</p>}
              </div>
              <p class='textInfoType'>{ activity === 'Cinema'||activity === 'Movie' || activity === 'Theater' ? <p> Only now you can choose the type of entertainment: </p> : <p></p>}</p>

            </div>
          </div>

          <div class='zone'>
            <div class='randomBottom'>
              <div class='randomBottom'>
            </div>
              <button class='typeBottom' onClick={showAlertSexyTime}> Choose the kind of sexy</button>
            </div>
            <div class='card'>
              { sexyTime== null ? <p> Click to chose </p> : <p>{sexyTime}</p>}
            </div>
          </div>
        </div>
      </div>

    </div>
    )
}

export default App;