import ActionTypes from '../constant/constant';

const initialState = {
    currentUser: {},
    isProgress: false,
    isError: false,
    errorText: ''
}
export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_ERROR:
            return ({ ...state, isError: true, errorText: action.errorText, isProgress: false })
        case ActionTypes.LOGIN_ERROR_ALERT:
            return ({ ...state, isError: false, errorText: '', isProgress: false })
        case ActionTypes.LOGIN_PROGRESS:
            return ({ ...state, isProgress: true })
        case ActionTypes.LOGIN_SUCCEED:
            return ({ ...state, currentUser: action.payload, isProgress: false })
        default:
            return state;
    }
}