import ActionTypes from '../constant/constant';

const initailState = {
    currentUser: {},
    isProgress: false,
    isError: false,
    errorText: ''
}
export default (state = initailState, action) => {
    switch (action.type) {
        case ActionTypes.SIGNUP_SUCCEED:
            // console.log(action.);
            return ({ ...state, currentUser: action.payload, isProgress: false })
        
        case ActionTypes.SIGNUP_PROGRESS:
            return ({ ...state, isProgress: true })
        case ActionTypes.SIGNUP_ERROR:
            return ({ ...state, isError: true, errorText: action.errorText })
        case ActionTypes.SIGNUP_ERROR_ALERT:
            return ({ ...state, isError: false, errorText: '', isProgress: false })
        default:
            return state;
    }

}