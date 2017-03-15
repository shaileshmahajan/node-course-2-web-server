const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//this creates a static server . http://localhost:3000/help.html
app.use(express.static(__dirname + '/public')); //__dirname stores path to project directory

//integrate templating engine handlebars. we are using hbs which is wrapper around handlebars
app.set('view engine', 'hbs');

//this is for partial templating so those duplicate html code can be reduced, can be added in any hbs files
hbs.registerPartials(__dirname + '/views/partials')


//remove duplicated code of getting currentYear
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

//below is express middleware. it is any number of fucntions that sits in the middle
//between a raw request and final intended route.
//without call to next(), no request will move to intended route
//keep in mind, calls to  app.use() fires in sequential ways as they are coded.

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});


// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.get('/', (req,res) =>{
  // res.send({
  //   name:'Shailesh',
  //   likes:[
  //     'Biking',
  //     'cities'
  //   ]
  // });

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to shailesh website',
    //currentYear: new Date().getFullYear()
  });

});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'Shailesh Page',
    //currentYear: new Date().getFullYear()
  });
});


app.get('/bad', (req,res) =>{
    res.send(
      {
        errorMessage: 'Unable to handle request'
      }
    );
  }

);

app.listen(3000, ()=>{
  console.log ('Server is up and running on port 3000');
});
