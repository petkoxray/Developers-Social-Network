const Profile = require('../../models/Profile');
const validateEducation = require('../../validation/education');

module.exports = {
    addEducationPost: async (req, res) => {
        const { errors, isValid } = validateEducation(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profile = await Profile.findOne({ user: req.user.id });

        if (!profile) {
            errors.noProfile = "Please first create profile to add education";
            return res.status(400).json(errors);
        }

        const newEdu = { ...req.body };
        profile.education.unshift(newEdu);
        const newProfile = await profile.save();

        return res.json(newProfile);
    },

    deleteEducation: async (req, res) => {
        const eduId = req.params.edu_id;
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education = profile.education.filter((e) => e.id !== eduId);
        const newProfile = await profile.save();

        return res.json(newProfile);
    }
};