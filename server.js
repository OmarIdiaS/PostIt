var express = require('express');
var app = express();
var bodyP = require('body-parser');
var session = require('express-session');


app.use('/public', express.static('public'));
//app.use(bodyP.urlencoded({ extended: false }));
app.use(bodyP.json());
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
    
}));

var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: app,
    noCache: true,
});

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
// Part 4
/*
app.get('/userlist', async (req, res) => {
  if (req.session.user) {
    try {
      res.render('userlist.html', { 
        users: await knex('users'),
        current: req.session.user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  } else {
    res.redirect('/');
  }
});*/
app.get('/lst', async (req, res) => {
res.render('lst.html', { 
        donn: await knex('donn'),
      });
});

// Part 5
/*
//suppression
app.get('/supp', async (req, res) => {
  var data = {
    login: req.body.login,
    txt : req.body.txt,
    coor: req.body.coor,
    
  };
  await knex('donn').del()
  res.redirect('/lst');
  

});*/
app.get('/p', async (req, res) => {
  
res.render('post_it.html', { 
        donn: await knex('donn'),
      });
});
/*
app.get('/p', (req, res) => {
  //res.render('post_it.html');
  res.render('post_it.html', { 
        donn: await knex('donn'),
      });
});*/

app.post('/p', async (req, res) => {
  
  var data = {
    login: req.body.login,
    txt : req.body.txt,
    coor: req.body.coor,
    
  };
  
  try {
    
    if (await knex('donn').insert(data)) {
      res.redirect('/p');
    } 
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      console.error(err);
      res.status(500).send('Error');
      res.redirect('/');
    }
  }
  /*res.render('post_it.html', { 
        donn: await knex('donn'),
      });*/
 });


// Part 6
/*
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/userlist');
  } else {
    res.render('login.html');
  }
});

app.post('/', async (req, res) => {
  var user = await knex('users').where({
    login: req.body.login,
    pass: req.body.password,
  }).first();
  if (user) {
    req.session.user = user;
    res.redirect('/userlist');
  } else {
    res.render('login.html', { 
      login: req.body.login,
      message: 'Wrong login or password',
    });
  }
});

app.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});
*/
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
