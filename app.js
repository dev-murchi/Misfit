const express = require('express');
const app = express();

const pageController = require('./controllers/pageController');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

// ROUTES
app.get('/', pageController.getHomePage);
app.get('/about', pageController.getAboutPage);
app.get('/trainer', pageController.getTrainerPage);
app.get('/gallery', pageController.getGalleryPage);
app.get('/contact', pageController.getContactPage);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT}...`);
});