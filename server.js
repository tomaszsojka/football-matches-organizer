const express = require('express');

const app = express();

app.get('/api/posts', (req, res) => {
  const posts = [
    {id: 1, 
        title: 'Finding simplicity in life', 
        content: 'Life can get complicated really quickly, but it doesn\'t have to be! There are many ways to simplify your life, a few of which we\'ve explored in the past. This week we\'re taking a bit of a approach though, in how you can find simplicity in the life you already living.',
        info: 'July 23, 2019 | 3 comments'
    },
    {id: 2, 
        title: 'Keeping cooking simple', 
        content: 'Food is a very important part of everyone\'s life. If you want to be healthy, you have to eat healthy. One of the easiest ways to do that is to keep your cooking nice and simple.',
        info: 'July 19, 2019 | 3 comments'
    },
    {id: 3, 
        title: 'Simplicity and work', 
        content: 'Work is often a major source of stress. People get frustrated, it ruins their relationship with others and it leads to burnout. By keeping your work life as simple as possible, it will help balance everything out.',
        info: 'July 12, 2019 | 3 comments'
    },
    {id: 4, 
        title: 'Simple decorations', 
        content: 'A home isn\'t a home until you\'ve decorated a little. People either don\'t decorate, or they go overboard and it doesn\'t have the impact they were hoping for. Staying simple will help draw the eye where you want it to and make things pop like never before.',
        info: 'July 12, 2019 | 3 comments'
    }
  ];

  res.json(posts);
});


app.get('/api/matches', (req, res) => {
    const matches = [
      {
          id: 1, 
          date: "2020-10-21", 
          hometeam: "Bayern Munich",
          homestartinglineup: {
            positions: ["GK", "LB", "LCB", "RCB", "RB",
                        "LDM", "RDM",
                        "LW", "CM", "RW",
                        "A"
                       ],
            playernames: ["Manuel Neuer", "Alphonso Davies", "David Alaba", "Niclas Sule", "Benjamin Pavard", 
                          "Leon Goretzka", "Joshua Kimmich",
                          "Leroy Sane", "Thomas Muller", "Kingsley Coman",
                          "Robert Lewandowski"
                         ]
          },
          awayteam: "Atletico Madit",
          awaystartinglineup: {
            positions: ["GK", "LB", "LCB", "RCB", "RB",
                        "LDM", "RDM",
                        "LW", "CM", "RW",
                        "A"
                       ],
            playernames: ["Manuel Neuer", "Alphonso Davies", "David Alaba", "Niclas Sule", "Benjamin Pavard", 
                          "Leon Goretzka", "Joshua Kimmich",
                          "Leroy Sane", "Thomas Muller", "Kingsley Coman",
                          "Robert Lewandowski"
                         ]
          },
          score: "",
          goalscorers: [],
          yellowcards: [],
          redcards: []
      },
      {
          id: 2, 
          date: "2020-10-27", 
          hometeam: "Bayern Munich",
          homestartinglineup: {
            positions: ["GK", "LB", "LCB", "RCB", "RB",
                        "LDM", "RDM",
                        "LW", "CM", "RW",
                        "A"
                       ],
            playernames: ["Manuel Neuer", "Alphonso Davies", "David Alaba", "Niclas Sule", "Benjamin Pavard", 
                          "Leon Goretzka", "Joshua Kimmich",
                          "Leroy Sane", "Thomas Muller", "Kingsley Coman",
                          "Robert Lewandowski"
                         ]
          },
          awayteam: "Lokomotiv Moscow",
          awaystartinglineup: {
            positions: ["GK", "LB", "LCB", "RCB", "RB",
                        "LDM", "RDM",
                        "LW", "CM", "RW",
                        "A"
                       ],
            playernames: ["Manuel Neuer", "Alphonso Davies", "David Alaba", "Niclas Sule", "Benjamin Pavard", 
                          "Leon Goretzka", "Joshua Kimmich",
                          "Leroy Sane", "Thomas Muller", "Kingsley Coman",
                          "Robert Lewandowski"
                         ]
          },
          score: "",
          goalscorers: [],
          yellowcards: [],
          redcards: []
      },
      {
          id: 3, 
          date: "2020-10-26", 
          hometeam: "Real Madrit",
          homestartinglineup: {
            positions: ["GK", "LB", "LCB", "RCB", "RB",
                        "LDM", "RDM",
                        "LW", "CM", "RW",
                        "A"
                       ],
            playernames: ["Manuel Neuer", "Alphonso Davies", "David Alaba", "Niclas Sule", "Benjamin Pavard", 
                          "Leon Goretzka", "Joshua Kimmich",
                          "Leroy Sane", "Thomas Muller", "Kingsley Coman",
                          "Robert Lewandowski"
                         ]
          },
          awayteam: "Barcelona",
          awaystartinglineup: {
            positions: ["GK", "LB", "LCB", "RCB", "RB",
                        "LDM", "RDM",
                        "LW", "CM", "RW",
                        "A"
                       ],
            playernames: ["Manuel Neuer", "Alphonso Davies", "David Alaba", "Niclas Sule", "Benjamin Pavard", 
                          "Leon Goretzka", "Joshua Kimmich",
                          "Leroy Sane", "Thomas Muller", "Kingsley Coman",
                          "Robert Lewandowski"
                         ]
          },
          score: "",
          goalscorers: [],
          yellowcards: [],
          redcards: []
      },
      {
          id: 4, 
          date: "2020-10-21", 
          hometeam: "Bayern Munich",
          homestartinglineup: {
            positions: ["GK", "LB", "LCB", "RCB", "RB",
                        "LDM", "RDM",
                        "LW", "CM", "RW",
                        "A"
                       ],
            playernames: ["Manuel Neuer", "Alphonso Davies", "David Alaba", "Niclas Sule", "Benjamin Pavard", 
                          "Leon Goretzka", "Joshua Kimmich",
                          "Leroy Sane", "Thomas Muller", "Kingsley Coman",
                          "Robert Lewandowski"
                         ]
          },
          awayteam: "Atletico Madit",
          awaystartinglineup: {
            positions: ["GK", "LB", "LCB", "RCB", "RB",
                        "LDM", "RDM",
                        "LW", "CM", "RW",
                        "A"
                       ],
            playernames: ["Manuel Neuer", "Alphonso Davies", "David Alaba", "Niclas Sule", "Benjamin Pavard", 
                          "Leon Goretzka", "Joshua Kimmich",
                          "Leroy Sane", "Thomas Muller", "Kingsley Coman",
                          "Robert Lewandowski"
                         ]
          },
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

