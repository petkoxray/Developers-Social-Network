const controllers = require('../controllers/api');
const passport = require('passport');

module.exports = (app) => {
    app.get('/api/users/register', controllers.users.registerGet);
    app.post('/api/users/register', controllers.users.registerPost);
    app.post('/api/users/login', controllers.users.loginPost);

    app.get('/api/users/current', passport.authenticate('jwt', { session: false }),
        (req, res) => {
            res.json({
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            });
        });

    app.get('/api/posts/test', controllers.posts.postTest);
    app.get('/api/profile/test', controllers.profile.profileTest);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
