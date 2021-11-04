const express = require('express');
const app = express();

const pageController = require('./controllers/pageController');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

// ROUTES
app.get('/', pageController.getHomePage);
app.get('/about', pageController.getAboutPage);
app.get('/trainer', pageController.getTrainerPage);
app.get('/programs', pageController.getProgramsPage);
app.get('/programs/:id', pageController.getProgram);
app.get('/contact', pageController.getContactPage);
app.get('/login', pageController.loginPage);
app.get('/register', pageController.registerPage);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT}...`);
});