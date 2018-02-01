import ActionTypes from '../constant/constant';
import configDefault from './firebaseConfig';
import { browserHistory } from 'react-router';

export function logoutRequestAsync() {
    return dispatch => {
        configDefault.auth().signOut()
            .then(() => {
                browserHistory.replace('/login');
                dispatch(logoutSucceed());
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}

export function logoutSucceed() {
    return {
        type: ActionTypes.LOGOUT 
    }
}