const User = require('../models/user');

const user_signup = (req, res) => {
    res.render('signup', {title: 'Signup', user: req.user});
}

const user_signup_post = async (req, res) => {
    const {name, email, password} = req.body;

    userAvailable = await User.findOne({email});
    if(userAvailable){
        console.log("email already exists");
        res.redirect('/users/signup');
    }
    else{
        await User.create({name, email, password});
        res.redirect('/users/login');
    }
}

const user_login = (req, res) => {
    res.render('login', {title: 'Login', user: req.user});
}

const user_logout = (req, res) => {
    req.logOut(function(err) {
        if (err){ 
            return next(err); 
        }
        res.redirect('/blogs');
    });
}

module.exports = {user_signup, user_signup_post, user_login, user_logout}