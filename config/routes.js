const controllers = require('../controllers/api');
const passport = require('passport');

module.exports = (app) => {
    app.post('/api/users/register', controllers.users.registerPost);
    app.post('/api/users/login', controllers.users.loginPost);
    app.get('/api/users/current',
        passport.authenticate('jwt', { session: false }),
        controllers.users.currentUser);

    app.get('/api/posts/test', controllers.posts.postTest);
    app.get('/api/profile/test', controllers.profile.profileTest);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
