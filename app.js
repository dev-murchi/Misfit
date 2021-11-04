const express = require('express');
const app = express();

//const pageController = require('./controllers/pageController');

const pageRoute = require('./routes/pageRoute');
const programRoute = require('./routes/programRoute');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

// ROUTES

app.use('/', pageRoute);
app.use('/programs', programRoute);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT}...`);
});