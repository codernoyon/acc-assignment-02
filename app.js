const express = require('express');
const app = express();
const cors = require('cors');
const toursRoute = require('./routes/tours.route');
const toureRoute = require('./routes/tour.route');

// middlewares
app.use(cors())
app.use(express.json());


// routes
app.use('/api/v1/tours', toursRoute);
app.use('/api/v1/tour', toureRoute)

// testing server route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.all('*', (req, res) => {
    res.sendFile(__dirname + '/public//404.html');
})



module.exports = app;