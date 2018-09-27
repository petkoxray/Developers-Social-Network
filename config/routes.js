const controllers = require('../controllers/api');
const passport = require('passport');

module.exports = (app) => {
    //@method POST
    //@desc Register user
    //@access Public
    app.post('/api/auth/register', controllers.auth.registerPost);

    //@method POST
    //@desc Login user
    //@access Public
    app.post('/api/auth/login', controllers.auth.loginPost);

    //@method GET
    //@desc Show authenticated user profile
    //@access Authenticated user
    app.get('/api/users/profile',
        passport.authenticate('jwt', { session: false }),
        controllers.users.profileGet);

    //@method GET
    //@desc Show all user profiles
    //@access Public
    app.get('/api/profiles',
        controllers.profiles.profilesAllGet);

    //@method POST
    //@desc Create authenticated user profile
    //@access Authenticated user
    app.post('/api/profiles',
        passport.authenticate('jwt', { session: false }),
        controllers.profiles.profilesPost);

    //@method GET
    //@desc Get user profile by handle
    //@access Public
    app.get('/api/profiles/handle/:handle',
        controllers.profiles.profilesHandleGet);

    //@method POST
    //@desc Add experience to user profile
    //@access Authenticated user
    app.post('/api/profiles/experience',
        passport.authenticate('jwt', { session: false }),
        controllers.experience.addExperiencePost);

    //@method DELETE
    //@desc DELETE experience from user profile
    //@access Authenticated user
    app.delete('/api/profiles/experience/:exp_id',
        passport.authenticate('jwt', { session: false }),
        controllers.experience.deleteExperience);

    //@method POST
    //@desc Add education to user profile
    //@access Authenticated user
    app.post('/api/profiles/education',
        passport.authenticate('jwt', { session: false }),
        controllers.education.addEducationPost);

    //@method DELETE
    //@desc DELETE education from user profile
    //@access Authenticated user
    app.delete('/api/profiles/education/:edu_id',
        passport.authenticate('jwt', { session: false }),
        controllers.education.deleteEducation);

    //@method all
    //@desc Not found URLS
    //@access Public
    // app.all('*', (req, res) => {
    //     res.status(404);
    //     res.send('404 Not Found');
    //     res.end();
    // });
};