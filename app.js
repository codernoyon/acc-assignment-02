const express = require('express');
const app = express();
const cors = require('cors');
const tourRoute = require('./routes/tour.route');

// middlewares
app.use(cors())
app.use(express.json());


// routes
app.use('/tours', tourRoute);


// testing server route
app.get('/', (req, res) => {
    res.json("YAY! Server is Runnig on.")
});

app.all('*', (req, res) => {
    res.json("No routee Found!!")
})



module.exports = app;