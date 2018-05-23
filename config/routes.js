const controllers = require('../controllers/api');

module.exports = (app) => {
    app.get('/api/users/test', controllers.users.userTest);
    app.get('/api/posts/test', controllers.posts.postTest);
    app.get('/api/profile/test', controllers.profile.profileTest);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
