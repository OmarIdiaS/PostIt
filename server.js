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


app.get('/connexion', (req, res) => {
  if (req.session.user) {
    res.redirect('/p');
  } else {
    res.render('login.html');
  }
});

app.post('/connexion', async (req, res) => {
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
      res.redirect('/connexion');
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


app.get('/', async (req, res) => {

res.render('guest.html', { 
        donn: await knex.raw(`SELECT * FROM donn`),
        
      });
});

app.post('/', async (req, res) => {
  
  var data = {
    txt: req.body.txt,
    datee  : req.body.datee,
    x: req.body.x , 
    y : req.body.y , 
    useer : req.session.user,
 };
  
  try {
    
    if (req.session.user &
      await knex('donn').insert(data)) {
      res.redirect('/');
    } 
    
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      console.error(err);
      res.status(500).send('Error');
      res.redirect('/connexion');
    }
  }
  
 });

app.get('/p', async (req, res) => {
  
res.render('post_it.html', { 
        donn: await knex.raw(`SELECT * FROM donn`),
        current: req.session.user,
      });
});

app.post('/p', async (req, res) => {
  
  var data = {
    txt: req.body.txt,
    datee  : req.body.datee,
    x: req.body.x , 
    y : req.body.y , 
    useer : req.session.user,
 };
  
  try {
    
    if (await knex('donn').insert(data)) {
      res.redirect('/');
    } 
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      console.error(err);
      res.status(500).send('Error');
      res.redirect('/connexion');
    }
  }
  
 });


app.get('/suppr', async (req, res) => {
  
res.render('post_it.html', { 
        donn: await knex('donn'),
      });
});



app.post('/suppr', async (req, res) => {
  if(!(req.session.user == "admin")){
await knex('donn')
       .where({useer : req.session.user})
       .andWhere({id : req.body.img})
       .del();
  
  res.redirect('/p');
  }
  else
  {
  await knex('donn')
       .where({id : req.body.img})
       .del();
    
    res.redirect('/p');
  }
});

app.post('/admindelete', async (req, res) => {
  if(req.session.user == "admin"){
    await knex('donn').del();
  }
    res.redirect('/p');
}); 



app.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});


app.get('/:n', async (req, res) => {
  
  res.render('tabuser.html',
             {
    current :req.session.user, 
    donn : await knex('donn')
          .where({useer : req.params.n})
  });
  
 
});

app.post('/modif', async (req, res) => {
  
  if(!(req.session.user == "admin") ){
    
await knex('donn')
       .where({useer : req.session.user})
       .andWhere({id : req.body.img})
       .update({txt: req.body.nouveau})
       .update({datee : req.body.ndatee});
  
  
  res.redirect('/p');}
  
  if(req.session.user == "admin"){
  await knex('donn')
       .where({id : req.body.img})
       .update({txt: req.body.nouveau})
       .update({datee : req.body.ndatee});
  
  
  res.redirect('/p');
  }
});



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
