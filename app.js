const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require("dotenv").config();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');


// express app
const app = express();

// connect to mongodb & listen for requests
mongoose.connect(process.env.CONNECTION_STRING)
  .then(result => app.listen(3000, () => console.log(`Database is connected and app is running at http://localhost:3000`)))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Middleware of passport auth
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: false ,
}))

app.use(passport.initialize()) // init passport on every route call
app.use(passport.session())    //allow passport to use "express-session"

authUser =  async (username, password, done) => {
// Use the "username" and "password" to search the DB and match username/password to authenticate the user
  try{
    const user = await User.findOne({email:username});
    if(!user){
      return done(null, false);
    }

    if(user.password !== password){
      return done (null, false);
    }

    return done(null, user);
  }
  catch(error){
    return done(error, false);
  }
}

passport.use(new LocalStrategy (authUser))

passport.serializeUser( (user, done) => {     
  done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  try{
    const user = await User.findById(id);
    done(null, user);
  }catch(error){ 
    done (null, false);   
  }
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', user: req.user});
});

// blog routes
app.use('/blogs', blogRoutes);
// user routes
app.use('/users', userRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});