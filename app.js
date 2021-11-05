const express = require('express');
const mongoose = require('mongoose');
const app = express();

const pageRoute = require('./routes/pageRoute');
const programRoute = require('./routes/programRoute');
const categoryRoute = require('./routes/categoryRoute'); 
const userRoute = require('./routes/userRoute');
const proficiencyRoute = require('./routes/proficiencyRoute');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

// ROUTES

app.use('/', pageRoute);
app.use('/programs', programRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
app.use('/proficiency', proficiencyRoute);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT} and connecting to Mongo DB...`);
    // Conenct DB
    mongoose.connect('mongodb://localhost/misfit-project-db',{ 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('DB Connected Successfully!')
    }).catch((error) => {
        console.log(error);
    });
});