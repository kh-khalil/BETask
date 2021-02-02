const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// require('dotenv/config');
const cors = require('cors');
// Import Routers
const teamsRoute = require('./routes/teams');
const matchesRoute = require('./routes/matches');
const dataRoute = require('./routes/data');
//Middlewares
app.use(cors());
app.use(bodyParser.json())
app.use('/teams', teamsRoute)
app.use('/matches', matchesRoute)
app.use('/data', dataRoute)


// connect to DB
mongoose
   .connect(
      "mongodb://localhost/localBEtutorialDB", //local DB
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