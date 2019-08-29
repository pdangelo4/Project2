module.exports = (req, res, next) => {
    // If the user is logged in 
    if (req.user) {
        //Cool this is expected. They are logged in. Allow them to proceed
        next();
    }
    else {
        //Cool
    // Otherwise user is not logged in
        // Not cool. Don't let them in. Make them log in FIRST;
        req.flash('error', 'You ust be logged in to view this page!');
        res.redirect('/auth/login');
    }
}
