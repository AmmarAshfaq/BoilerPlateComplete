import ActionTypes from '../constant/constant';

const initialState = {
    currentUser: {}
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGOUT:
            return ({ ...state, currentUser: null })

        default:
            return state;
    }
}