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


app.get('/lst', async (req, res) => {
res.render('lst.html', { 
        donn: await knex('donn'),
      });
});


app.get('/p', async (req, res) => {
  
res.render('post_it.html', { 
        donn: await knex.raw(`SELECT * FROM donn WHERE login="omar"`),
      });
});

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


app.get('/suppr', async (req, res) => {
  
res.render('post_it.html', { 
        donn: await knex('donn').del(),
      });
});

app.post('/suppr', async (req, res) => {
  
  
 try {
    
    if (await knex('donn').del()) {
      res.redirect('/lst');
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




app.post('/signin', async (req, res) => {
  var data = {
    login: req.body.login,
    pass: req.body.password,
    name: req.body.name,
    color1: req.body.color1,
    color2: req.body.color2,
    x : req.body.x
  };
  try {
    if (data.login 
        && data.pass
        && await knex('users').insert(data)) {
      res.redirect('/p');
    } else {
      res.render('signin.html', { data: data, message: 'Bad data' });
    }
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      res.render('signin.html', { data: data, message: 'Login already taken' });
    } else {
      console.error(err);
      res.status(500).send('Error');
    }
  }
});
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
