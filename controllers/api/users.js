const Profile = require('../../models/Profile');

module.exports = {
    profileGet: async (req, res) => {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        const errors = {};

        if (!profile) {
            errors.noprofile = "There is no profile for this user.";

            return res.status(404).json(errors);
        }

        return res.json(profile);
    },
};