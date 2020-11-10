const express = require('express');
const logger = require('./middleware/logger');
const app = express();


//Body parser middelware
app.use(express.json());
//Form submission
app.use(express.urlencoded({ extended: false }))

 //init of my middleware
//app.use(logger);

// app.use(express.static('fmo-front-reactjs/public'));

app.use('/api/guest', require('./routes/api/guest'));

app.use('/api/user', require('./routes/api/user'));

app.use('/api/mobile', require('./routes/api/mobile'));


const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("fmo-front-reactjs/build"));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'fmo-front-reactjs', 'build', 'index.html'));
    });
}


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

