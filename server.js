const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }))
.use(express.json());

// app.use(express.static('fmo-front-reactjs/public'));

app.get('/api/user/posts', (req, res) => {
  const posts = [
    {
      id: 1, 
      title: 'Finding simplicity in life', 
      content: 'Life can get complicated really quickly, but it doesn\'t have to be! There are many ways to simplify your life, a few of which we\'ve explored in the past. This week we\'re taking a bit of a approach though, in how you can find simplicity in the life you already living.',
      info: 'July 23, 2019 | 3 comments'
    },
    {
      id: 2, 
      title: 'Keeping cooking simple', 
      content: 'Food is a very important part of everyone\'s life. If you want to be healthy, you have to eat healthy. One of the easiest ways to do that is to keep your cooking nice and simple.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      info: 'July 19, 2019 | 3 comments'
    },
    {
      id: 3, 
      title: 'Simplicity and work', 
      content: 'Work is often a major source of stress. People get frustrated, it ruins their relationship with others and it leads to burnout. By keeping your work life as simple as possible, it will help balance everything out.',
      info: 'July 12, 2019 | 3 comments'
    },
    {
      id: 4, 
      title: 'Simple decorations', 
      content: 'A home isn\'t a home until you\'ve decorated a little. People either don\'t decorate, or they go overboard and it doesn\'t have the impact they were hoping for. Staying simple will help draw the eye where you want it to and make things pop like never before.',
      info: 'July 12, 2019 | 3 comments'
    }
  ];

  res.json(posts);
});

app.post('/api/guest/login', (req, res) => {
  const { body } = req;
  const  userRes = 
    {
      email: "aaa@aa.com",
      password: "aaa",
      phoneNumber: "123123123",
      role : "User"

    };

  if(body.email === userRes.email && body.password === userRes.password) {
    console.log("OK");
    res.json(userRes);
    
  }
});


app.get('/api/matches', (req, res) => {
    const matches = [
      {
          id: 1, 
          date: "2020-10-21", 
          hour: "21:00", 
          hometeam: "Bayern Munich",
          homestartinglineup: [
              {playername: "Manuel Neuer", tshirtnumber: "1", position: "GK", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Alphonso Davies", tshirtnumber: "19", position: "LB", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "David Alaba", tshirtnumber: "27", position: "LCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Niclas Sule", tshirtnumber: "4", position: "RCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Benjamin Pavard", tshirtnumber: "5", position: "RB", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Leon Goretzka", tshirtnumber: "18", position: "LDM", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Joshua Kimmich", tshirtnumber: "6", position: "RDM", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Leroy Sane", tshirtnumber: "10", position: "LW", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Thomas Muller", tshirtnumber: "25", position: "CM", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Kingsley Coman", tshirtnumber: "29", position: "RW", yellowcards: "", redcards: "", scoredgoalstime: ""},
              {playername: "Robert Lewandowski", tshirtnumber: "9", position: "FW", yellowcards: "", redcards: "", scoredgoalstime: ""}
          ],
          awayteam: "Atletico Madit",
          awaystartinglineup: [
            {playername: "Jan Oblak", tshirtnumber: "13", position: "GK", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Renan Lodi", tshirtnumber: "12", position: "LB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Jose Maria Gimenez", tshirtnumber: "2", position: "LCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Stefan Savic", tshirtnumber: "15", position: "RCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Kieran Trippier", tshirtnumber: "23", position: "RB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Marcos Llorente", tshirtnumber: "14", position: "LW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Saul Niguez", tshirtnumber: "8", position: "LM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Hector Herrera", tshirtnumber: "16", position: "RM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Angel Correa", tshirtnumber: "10", position: "RW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Joao Felix", tshirtnumber: "7", position: "LFW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Luis Suarez", tshirtnumber: "9", position: "RFW", yellowcards: "", redcards: "", scoredgoalstime: ""}
        ],
          score: "",
          goalscorers: [],
          yellowcards: [],
          redcards: []
      },
      {
          id: 2, 
          date: "2020-10-27",  
          hour: "21:00", 
          hometeam: "Bayern Munich",
          homestartinglineup: [
            {playername: "Manuel Neuer", tshirtnumber: "1", position: "GK", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Alphonso Davies", tshirtnumber: "19", position: "LB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "David Alaba", tshirtnumber: "27", position: "LCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Niclas Sule", tshirtnumber: "4", position: "RCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Benjamin Pavard", tshirtnumber: "5", position: "RB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Leon Goretzka", tshirtnumber: "18", position: "LDM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Joshua Kimmich", tshirtnumber: "6", position: "RDM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Leroy Sane", tshirtnumber: "10", position: "LW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Thomas Muller", tshirtnumber: "25", position: "CM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Kingsley Coman", tshirtnumber: "29", position: "RW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Robert Lewandowski", tshirtnumber: "9", position: "FW", yellowcards: "", redcards: "", scoredgoalstime: ""}
        ],
          awayteam: "Lokomotiv Moscow",
          awaystartinglineup: [
            {playername: "Jan Oblak", tshirtnumber: "13", position: "GK", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Renan Lodi", tshirtnumber: "12", position: "LB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Jose Maria Gimenez", tshirtnumber: "2", position: "LCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Stefan Savic", tshirtnumber: "15", position: "RCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Kieran Trippier", tshirtnumber: "23", position: "RB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Marcos Llorente", tshirtnumber: "14", position: "LW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Saul Niguez", tshirtnumber: "8", position: "LM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Hector Herrera", tshirtnumber: "16", position: "RM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Angel Correa", tshirtnumber: "10", position: "RW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Joao Felix", tshirtnumber: "7", position: "LFW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Luis Suarez", tshirtnumber: "9", position: "RFW", yellowcards: "", redcards: "", scoredgoalstime: ""}
        ],
          score: "",
          goalscorers: [],
          yellowcards: [],
          redcards: []
      },
      {
          id: 3, 
          date: "2020-10-26",  
          hour: "21:00", 
          hometeam: "Real Madrit",
          homestartinglineup: [
            {playername: "Manuel Neuer", tshirtnumber: "1", position: "GK", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Alphonso Davies", tshirtnumber: "19", position: "LB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "David Alaba", tshirtnumber: "27", position: "LCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Niclas Sule", tshirtnumber: "4", position: "RCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Benjamin Pavard", tshirtnumber: "5", position: "RB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Leon Goretzka", tshirtnumber: "18", position: "LDM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Joshua Kimmich", tshirtnumber: "6", position: "RDM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Leroy Sane", tshirtnumber: "10", position: "LW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Thomas Muller", tshirtnumber: "25", position: "CM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Kingsley Coman", tshirtnumber: "29", position: "RW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Robert Lewandowski", tshirtnumber: "9", position: "FW", yellowcards: "", redcards: "", scoredgoalstime: ""}
        ],
          awayteam: "Barcelona",
          awaystartinglineup: [
            {playername: "Jan Oblak", tshirtnumber: "13", position: "GK", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Renan Lodi", tshirtnumber: "12", position: "LB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Jose Maria Gimenez", tshirtnumber: "2", position: "LCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Stefan Savic", tshirtnumber: "15", position: "RCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Kieran Trippier", tshirtnumber: "23", position: "RB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Marcos Llorente", tshirtnumber: "14", position: "LW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Saul Niguez", tshirtnumber: "8", position: "LM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Hector Herrera", tshirtnumber: "16", position: "RM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Angel Correa", tshirtnumber: "10", position: "RW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Joao Felix", tshirtnumber: "7", position: "LFW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Luis Suarez", tshirtnumber: "9", position: "RFW", yellowcards: "", redcards: "", scoredgoalstime: ""}
        ],
          score: "",
          goalscorers: [],
          yellowcards: [],
          redcards: []
      },
      {
          id: 4, 
          date: "2020-10-21",  
          hour: "21:00", 
          hometeam: "Bayern Munich",
          homestartinglineup: [
            {playername: "Manuel Neuer", tshirtnumber: "1", position: "GK", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Alphonso Davies", tshirtnumber: "19", position: "LB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "David Alaba", tshirtnumber: "27", position: "LCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Niclas Sule", tshirtnumber: "4", position: "RCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Benjamin Pavard", tshirtnumber: "5", position: "RB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Leon Goretzka", tshirtnumber: "18", position: "LDM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Joshua Kimmich", tshirtnumber: "6", position: "RDM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Leroy Sane", tshirtnumber: "10", position: "LW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Thomas Muller", tshirtnumber: "25", position: "CM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Kingsley Coman", tshirtnumber: "29", position: "RW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Robert Lewandowski", tshirtnumber: "9", position: "FW", yellowcards: "", redcards: "", scoredgoalstime: ""}
        ],
          awayteam: "Atletico Madit",
          awaystartinglineup: [
            {playername: "Jan Oblak", tshirtnumber: "13", position: "GK", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Renan Lodi", tshirtnumber: "12", position: "LB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Jose Maria Gimenez", tshirtnumber: "2", position: "LCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Stefan Savic", tshirtnumber: "15", position: "RCB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Kieran Trippier", tshirtnumber: "23", position: "RB", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Marcos Llorente", tshirtnumber: "14", position: "LW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Saul Niguez", tshirtnumber: "8", position: "LM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Hector Herrera", tshirtnumber: "16", position: "RM", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Angel Correa", tshirtnumber: "10", position: "RW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Joao Felix", tshirtnumber: "7", position: "LFW", yellowcards: "", redcards: "", scoredgoalstime: ""},
            {playername: "Luis Suarez", tshirtnumber: "9", position: "RFW", yellowcards: "", redcards: "", scoredgoalstime: ""}
        ],
          score: "",
          goalscorers: [],
          yellowcards: [],
          redcards: []
      }
    ];
  
    res.json(matches);
  });


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

