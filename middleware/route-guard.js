//make sure that the user is logged in
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/login');
    }
    next();
};

//if the user is logged in and tries to access the login page, redirect to the home page
const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/');
    }
    next();
};

//these keys assigned to the names 
module.exports ={
    isLoggedIn,
    isLoggedOut
};