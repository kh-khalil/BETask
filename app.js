const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
// Import Routers
const teamsRoute = require('./routes/teams');
app.use(cors());
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
   res.send('We are on home');
});


//Middlewares
app.use('/teams', teamsRoute)


// connect to DB
mongoose
   .connect(
      "mongodb://localhost/localBEtutorialDB",
      {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      })
   .then(
      () => {
         console.log('connected to DB')
      },
      (err) => {
         console.log('connection error: ' + err)
         // console.log('connected to DB')
      }
);



// Listening to the server
app.listen(3000);