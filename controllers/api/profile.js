const Profile = require('../../models/Profile');

//Validator
const validateProfile = require('../../validation/profile');
// const validateEducation = require('../../validation/education');
// const validateExperience = require('../../validation/experience');


module.exports = {
    profileGet: async (req, res) => {
        const profile = await Profile.findOne({ user: req.user.id });
        const errors = {};

        if (!profile) {
            errors.noprofile = "There is no profile for this user.";

            return res.status(404).json(errors);
        }

        return res.json(profile);
    },

    profilePost: async (req, res) => {
        const { errors, isValid } = validateProfile(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const profileFields = {
            ...req.body,
            user: req.user.id,
            skills: req.body.skills ? req.body.skills.split(',') : []
        };

        // // Social
        // profileFields.social = {};
        // if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        // if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        // if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        // if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        // if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        const profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(updatedProfile);
        }

        const hasProfile = await Profile.findOne({ handle: profileFields.handle });

        if (hasProfile) {
            errors.handle = 'That handle / profile name already exists.';
            res.status(400).json(errors);
        }

        const newProflie = await new Profile(profileFields).save();
        res.json(newProflie);
    },
};