const Profile = require('../../models/Profile');
const validateExperience = require('../../validation/experience');

module.exports = {
    addExperiencePost: async (req, res) => {
        const { errors, isValid } = validateExperience(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            errors.noProfile = "Please first create profile to add experince!";
            return res.status(400).json(errors);
        }

        const newExp = { ...req.body };
        profile.experience.unshift(newExp);
        const newProfile = await profile.save();

        return res.json(newProfile);
    },

    deleteExperience: async (req, res) => {
        const expId = req.params.exp_id;
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience = profile.experience.filter((e) => e.id !== expId);
        const newProfile = await profile.save();

        return res.json(newProfile);
    }
};