const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

module.exports = {
    registerGet: (req, res) => {
        res.json({ msg: 'Users Works' });
    },

    registerPost: (req, res) => {
        const { email, name, password } = req.body;

        User.findOne({ email: email }).then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists!' });
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                email,
                name,
                password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user));
                });
            });
        });
    },

    loginPost: (req, res) => {
        const { email, password } = req.body;

        User.findOne({ email }).then(user => {
            if (!user) {
                return res.status(404).json({ email: 'User not found!' });
            }

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
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
            });
        });
    }
};
