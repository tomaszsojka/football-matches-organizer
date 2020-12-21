const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const app = express();

mongoose.set('useFindAndModify', false);


//Body parser middelware
app.use(express.json());
//Form submission
app.use(express.urlencoded({ extended: false }));

//DB Config
const db = require('./config/keys').mongoURI;
//Connect to mongoDB
mongoose
    .connect(process.env.MONGO_URI || db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err)); 

 //init of my middleware
//app.use(logger);

// app.use(express.static('fmo-front-reactjs/public'));

app.use('/api/guest', require('./routes/api/guest'));

app.use('/api/user', require('./routes/api/user/user'));
app.use('/api/user', require('./routes/api/user/teams'));
app.use('/api/user', require('./routes/api/user/posts'));
app.use('/api/user', require('./routes/api/user/invites'));
app.use('/api/user', require('./routes/api/user/calendar'));

app.use('/api/mobile', require('./routes/api/mobile'));




if (process.env.NODE_ENV === 'production') {
    app.use(express.static("fmo-front-reactjs/build"));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'fmo-front-reactjs', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

