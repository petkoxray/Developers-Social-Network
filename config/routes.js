const controllers = require('../controllers/api');
const passport = require('passport');

module.exports = (app) => {
    //@method POST
    //@desc Register user
    //@acces Public
    app.post('/api/users/register', controllers.users.registerPost);

    //@method POST
    //@desc Login user
    //@acces Public
    app.post('/api/users/login', controllers.users.loginPost);

    //@method GET
    //@desc Show authenticated user
    //@acces Authenticated user
    app.get('/api/users/current',
        passport.authenticate('jwt', { session: false }),
        controllers.users.currentUser);

    //@method POST
    //@desc Show autenticated user profile
    //@acces Authenticated user
    app.get('/api/profile',
        passport.authenticate('jwt', { session: false }),
        controllers.profile.profileGet);

    //@method POST
    //@desc Show autenticated user profile
    //@acces Authenticated user
    app.post('/api/profile',
        passport.authenticate('jwt', { session: false }),
        controllers.profile.profilePost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};