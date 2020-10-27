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

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'mo-front-reactjs/build', 'index.html'));
// });

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("fmo-front-reactjs/build"));
}


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

