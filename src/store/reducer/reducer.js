import ActionTypes from '../constant/constant';

const initailState = {
    count: 0
}
export default (state = initailState, action) => {
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return ({ ...state, count: state.count + 1 })
            break;
        case ActionTypes.DECREMENT:
            return ({ ...state, count: state.count - 1 })
            break;
        default:
            return state;
    }

}