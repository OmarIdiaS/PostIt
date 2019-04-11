var express = require('express');
var app = express();
var bodyP = require('body-parser');
var session = require('express-session');


app.use('/public', express.static('public'));
app.use(bodyP.urlencoded({ extended: false }));
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
        donn: await knex.raw(`SELECT * FROM donn`),
        current: req.session.user,
      });
});

app.post('/p', async (req, res) => {
  
  var data = {
    login: req.body.login,
    txt : req.body.txt,
    coor:req.body.coor,
    useer : req.session.user,
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
  
 });


app.get('/suppr', async (req, res) => {
  
res.render('post_it.html', { 
        donn: await knex('donn'),
      });
});

/*app.post('/suppr', async (req, res) => {
  
  
 try {
   if (await knex('donn')
       .where({useer : req.session.user})
       .andWhere({txt : req.body.txt})
       .del()) {
      res.redirect('/lst');
    } 
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      console.error(err);
      res.status(500).send('Error');
      res.redirect('/');
    }
  }

 });
*/

app.post('/suppr', async (req, res) => {
await knex('donn')
       .where({useer : req.session.user})
       .andWhere({txt : req.body.txt})
  .andWhere({login : req.body.login})
  .andWhere({txt : req.body.txt})
       .del();
  
  res.redirect('/p');
});

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/p');
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
    req.session.user = req.body.login;
    res.redirect('/p');
  } else {
    res.render('login.html', { 
      login: req.body.login,
      message: 'Wrong login or password',
    });
  }
});


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
});

app.get('/signin', (req, res) => {
  res.render('signin.html');
});

app.post('/signin', async (req, res) => {
  var data = {
    login: req.body.login,
    pass: req.body.password,
    name: req.body.name
  };
  try {
    if (data.login 
        && data.pass
        && await knex('users').insert(data)) {
      res.redirect('/');
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


app.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
