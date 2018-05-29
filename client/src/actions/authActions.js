import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/auth/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};