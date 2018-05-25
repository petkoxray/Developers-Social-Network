const Validator = require('validator');
const isEmpty = require('./custom-rules/is-empty');

module.exports = ({ email, name, password, confirmPassword }) => {
    let errors = {};

    name = !isEmpty(name) ? name : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';
    confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';

    if (!Validator.isLength(name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(confirmPassword)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (!Validator.equals(password, confirmPassword)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};