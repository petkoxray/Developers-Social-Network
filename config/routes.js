const controllers = require('../controllers/api');
const passport = require('passport');

module.exports = (app) => {
    //@method POST
    //@desc Register user
    //@access Public
    app.post('/api/users/register', controllers.users.registerPost);

    //@method POST
    //@desc Login user
    //@access Public
    app.post('/api/users/login', controllers.users.loginPost);

    //@method GET
    //@desc Show authenticated user
    //@access Authenticated user
    app.get('/api/users/current',
        passport.authenticate('jwt', { session: false }),
        controllers.users.currentUser);

    //@method POST
    //@desc Show authenticated user profile
    //@access Authenticated user
    app.get('/api/profile',
        passport.authenticate('jwt', { session: false }),
        controllers.profile.profileGet);

    //@method POST
    //@desc Create authenticated user profile
    //@access Authenticated user
    app.post('/api/profile',
        passport.authenticate('jwt', { session: false }),
        controllers.profile.profilePost);

    //@method GET
    //@desc Get user profile by handle
    //@access Public
    app.get('/api/profile/handle/:handle',
        controllers.profile.profileHandleGet);

    //@method POST
    //@desc Add experience to user profile
    //@access Authenticated user
    app.post('/api/profile/experience',
        passport.authenticate('jwt', { session: false }),
        controllers.experience.addExperiencePost);

    //@method DELETE
    //@desc DELETE experience from user profile
    //@access Authenticated user
    app.delete('/api/profile/experience/:exp_id',
        passport.authenticate('jwt', { session: false }),
        controllers.experience.deleteExperience);

    //@method POST
    //@desc Add education to user profile
    //@access Authenticated user
    app.post('/api/profile/education',
        passport.authenticate('jwt', { session: false }),
        controllers.education.addEducationPost);

    //@method DELETE
    //@desc DELETE education from user profile
    //@access Authenticated user
    app.delete('/api/profile/education/:edu_id',
        passport.authenticate('jwt', { session: false }),
        controllers.education.deleteEducation);

    //@method all
    //@desc Not found URLS
    //@access Public
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};