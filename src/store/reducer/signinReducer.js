import ActionTypes from '../constant/constant';

const initialState = {
    currentUser: {},
    isProgress: false,
    isError: false,
    errorText: '',
    allUser: [],
    messages: [],
    recipientID: '',
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
            console.log(action.payload)
            return ({ ...state, currentUser: action.payload, isProgress: false })
        case ActionTypes.ALLUSER:
            // console.log(action.payload)
            var arrValue = state.allUser;

            // console.log(action.payload)
            var arrObj = {
                name: action.payload.name,
                uid: action.payload.uid
            }

            // console.log(arrObj)
            arrValue.push(arrObj);
            // console.log(arrValue)
            return ({ ...state, allUser: arrValue })
        case ActionTypes.RECIEPENTID:
            // console.log("recipient Id:", action.payload)
            return ({ ...state, recipientID: action.payload })
        case ActionTypes.MESSEGES:
            console.log("Messeges:", action.payload)
            var msgValue = state.messages;
            console.log("State before change", msgValue);
            var msgObj = {
                message: action.payload.message,
                receiverId: action.payload.receiverID,
                senderId: action.payload.senderID,
            }
            msgValue.push(msgObj);
            console.log(msgValue)
            return ({ ...state, messages: msgValue })
        default:
            return state;
    }
}