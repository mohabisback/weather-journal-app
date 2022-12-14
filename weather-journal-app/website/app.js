/* Global Variables */

key = ',us&appid=fcdb1f2bba10164b35624f2a48e437bc&units=imperial'
baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='

// https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (Number(d.getMonth()) + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();

/* async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
*/
// async () => { res = await fetch (url); try{data = await res.json();} catch(error){}}
const getWeather = async (baseUrl, zip, key) =>{ 
  const res = await fetch(baseUrl + zip + key)
  try{
    const data = await res.json(); //await must be written
    return(data);
  } catch (error) {
    console.log("error: ", error);
  }
}


// async () => { res = await fetch (url, {req object}); try{data = await res.json();} catch(error){}}
const postData = async (url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', 
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  try {
  }catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// async () => { res = await fetch (url, {req object}); try{data = await res.json();} catch(error){}}
const getData = async (url ='') => {
  const response = await fetch(url, {
    method: 'GET'
  })
  const newData = await response.json();
  return newData
}

//Update UI
const updateUI = (data)=>{
  if(data){
    document.getElementById('date').innerText = data.date;
    document.getElementById('temp').innerText = data.temperature;
    document.getElementById('content').innerText = data['user response'];
  }
}
//Update Old UI
const updateOldUI = (data)=>{
  if(data){
    document.getElementById('date2').innerText = data.date;
    document.getElementById('temp2').innerText = data.temperature;
    document.getElementById('content2').innerText = data['user response'];
  }
}

//event listener for clicking generate
const myEvent = document.getElementById('generate').addEventListener('click',(e)=>{
  const zip = document.getElementById('zip').value;
  if (zip) {
    getWeather(baseUrl, zip, key)
    .then((data)=>{
      postData('/data', 
        {
          temperature: data.main.temp,
          date: newDate,
          'user response': document.getElementById('feelings').value
        }
      )
    })
    .then(()=>{
      return getData('/data')
    })
    .then((newData)=>{
      updateUI(newData)
    })
    .then(()=>{
      return getData('/oldData')
    })
    .then((oldData)=>{
      updateOldUI(oldData)
    })
  } else {
    return alert('Please, enter a valid zip code...')
  }
});
