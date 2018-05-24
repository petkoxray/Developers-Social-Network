const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Validators
const validateRegister = require('../../validation/register');
const validateLogin = require('../../validation/login');

module.exports = {
    registerPost: async (req, res) => {
        const { email, name, password } = req.body;
        const { errors, isValid } = validateRegister({ email, name, password });

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ email: 'Email already exists!' });
        }

        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;

                const newUser = await new User({
                    email,
                    name,
                    password: hash,
                    avatar
                }).save();

                return res.json(newUser);
            });
        });
    },

    loginPost: async (req, res) => {
        const { email, password } = req.body;
        const { errors, isValid } = validateLogin({ email, password });

        if (!isValid) {
            return res.status(400).json(errors);
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ email: 'User not found!' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar };

            jwt.sign(
                payload,
                keys.secret,
                { expiresIn: 3600 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );
        } else {
            return res.status(400).json({ password: "Password incorrect!" });
        }
    },

    currentUser: (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
};