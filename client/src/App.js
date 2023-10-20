import React, {useEffect, useState} from 'react';
import './App.css';

function App(){
  const [backendStart, setBackendStart] = useState('')
  const [meals, setMeals] = useState([])
  const [cocktails, setCocktails] = useState([])
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
    var seconds = 4000;
    const displayFoods = (foods) => {
      const mealElements = foods.map((food, index) => (
        <div key={index} className='card-ball-newinfo'>
          <a href={food.strMealThumb}>
            <p className='mealTitle'>{food.strMeal}</p>
          </a>
            <p className='mealCategory'>({food.strCategory})</p>
        </div>
      ));
      setMeals(mealElements);
      
      // Make the number 8 disappear
      document.getElementById("card-ball-info-inside").innerHTML = "";
      setTimeout(timeup, seconds);

      function timeup(){
        setMeals();
        document.getElementById("card-ball-info-inside").innerHTML="8";
      }
    };
  
  // Get place
  const showAlertPlace = () =>{
    fetch("/place")
      .then(response => response.json())
      .then(data => displayPlace(data.places)); // Use data.places here
  };
    
  function changeElement() {
    const liquidElement = document.getElementById('liquid');
    if (liquidElement && liquidElement.className === 'cocktail-content') {
      liquidElement.className = 'cocktail-content-empty';
    } else if (liquidElement && liquidElement.className === 'cocktail-content-empty') {
      liquidElement.className = 'cocktail-content';
    }
  }
  
   
  // Get a Cocktail
    const showCocktail = () => {
      //fetch("/randomCocktail")
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => displayCocktail(data)); // link to cocktail here
        changeElement();
    };



    const displayCocktail = (data) => {
      const cocktails = data.drinks[0]; // Access the first drink object
      const cocktailElement = (
        <div>
          <p>{cocktails.strDrink}</p>
          <p>{cocktails.strAlcoholic}</p>
        </div>
      );
      setCocktails([cocktailElement]); // Set it as an array to match the state
    };
    
  
  const displayPlace = (places) => {
    var placeRandom = getRandomItem(places);
    setPlace(placeRandom);
    power();
  };

  function power(){
    let light = document.querySelector('.card-lamp');
    let lightInfo = document.querySelector('.card-lamp-info-inside');
      if(light.classList.contains('card-lamp-on')){
        light.classList.remove('card-lamp-on');
        lightInfo.style.color="rgb(105, 103, 96,0)"; 
      }
      else{
        light.classList.add('card-lamp-on');
        lightInfo.style.color="black";
      }
  }


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

    

    // Get Random item
    function getRandomItem(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }
  
  return(
    <div className='body'>
      <div>
        <div className='header'>
          <div className='headerInfo'>
            {typeof backendStart === "string" && backendStart === "" ? (<p>loading..</p>) : (<p> {backendStart} </p>)}
          </div>

        </div>
        <div className="center">
          <div className='groupChoices'>
            <div className='randomChoices'>
              
              <div className='zone1'>
                <div className='card-ball'>
                  <div className='card-ball-info'>
                    <p id='card-ball-info-inside'> 8 </p>
                    { meals == null ? <p> </p> : <p >{meals}</p>}
                  </div>
                </div>
                <div className='randomButton'>
                  <button className='randomButtonBall' onClick={showAlertFood}> Choose a Meal</button>
                </div>
              </div>

              <div className='zone3'>
                <div className='card-cocktail-info'>
                  { cocktails == null ? <p> </p> : <p >{cocktails}</p>}
                </div>
                <div className='cocktail-glass'>
                  <div className='cocktail-glass-object'> 
                    <div id='liquid' className='cocktail-content-empty'></div>
                  </div>
                </div>
                <div className='randomButton'>
                  <button className='randomButtonCocktail' onClick={showCocktail}> Choose a Cocktail</button>
                </div>       
              </div>

              <div className='zone2'>
                <div className='card-lamp'></div>
                <div className='light'></div>
                <div className='card-lamp-info'>
                  { place== null ? <p> </p> : <p className='card-lamp-info-inside'>{place}</p>}
                </div>
                <div className='randomButton'>
                  <button className='randomButtonLamp' onClick={showAlertPlace}> Choose a place</button>
                </div>       
              </div>

              <div className='zone'>
                <div className='card'>
                  { activity == null ? <p>  </p> : <p className='infoCard'>{activity}</p>}
                </div>
                <div className='randomButton'>
                  <button className='typeBottom' onClick={showAlertActivity}> Choose an activity </button>
                </div>
              </div>

              <div className='zone'>
                <div className='card'>
                  { sexyTime== null ? <p> </p> : <p className='infoCard'>{sexyTime}</p>}
                </div>
                <div className='randomButton'>
                  <button className='typeBottom' onClick={showAlertSexyTime}> Choose the kind of sexy</button>
                </div>
              </div>
              <div className='zone1'>
                <p className='textInfoType'>{ activity === 'Cinema'||activity === 'Movie' || activity === 'Theater' ? <p> Only now you can choose the type of entertainment: </p> : <p></p>}</p>
                <div className='card'>
                  { showAlertActivity == null ? <p> </p> : <p className='infoCard'>{styleRandom}</p>}
                </div>
                <div className='randomButton'>
                  <button className='typeBottom' onClick={showAlertType}> Choose type the entertainment </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    )
}

export default App;