
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () =>{console.log('server running on port:8000...')});

app.post('/data', (req, res)=>{
  const {temperature, date} = req.body;
  const user_response = req.body['user response'];

  if (temperature && date && user_response){
    const id = Object.keys(projectData).length + 1;
    projectData = {
      ...projectData,
      [id]: {
        temperature,
        date,
        'user response': user_response
      }
    }
    res.status(201).json(projectData[id])
  } else {
    res.status(404).send('error')
  }
})

app.get('/data', (req, res)=>{
  let largestKey = 0; //for largest (i.e most recent) key added
  for (key of Object.keys(projectData)){
    largestKey = (largestKey > Number(key)) ? largestKey : Number(key)
  }
  if (largestKey) { //if there were any data in the projectData obj 
    res.status(200).json(projectData[String(largestKey)])
  } else {
    res.status(404).send('No data saved yet')
  }
})

app.get('/oldData', (req, res) =>{
  let largestKey = 0;
  let sndLargestKey = 0;
  for (key of Object.keys(projectData)){
    if (largestKey < Number(key)){
      sndLargestKey = largestKey;
      largestKey = Number(key);
    } else if (sndLargestKey < Number(key)){
      sndLargestKey = Number(key);
    }
  }
  if (sndLargestKey) { //if there were any data in the projectData obj 
    res.status(200).json(projectData[String(sndLargestKey)])
  } else {
    res.status(404).send('No data saved yet')
  }
})


app.all("*", (req, res)=>{
  res.status(404).send('<h1>Page Not Found...</h1>')
})



