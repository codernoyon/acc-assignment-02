const express = require('express');
const app = express();
const cors = require('cors');
const toursRoute = require('./routes/tours.route');
const toureRoute = require('./routes/tour.route');

// middlewares
app.use(cors())
app.use(express.json());


// routes
app.use('/tours', toursRoute);
app.use('/tour', toureRoute)

// testing server route
app.get('/', (req, res) => {
    res.json("YAY! Server is Runnig on")
});

app.all('*', (req, res) => {
    res.json("No routee Found!!")
})



module.exports = app;