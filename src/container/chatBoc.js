import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendMessage } from '../store/action/siginAction'

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaVal: ''
        }
    }
    _textAreaHandler(event) {
        this.setState({
            textAreaVal: event.target.value
        })
    }
    sendMessage() {
        console.log(this.state.textAreaVal);
        let messageData = {
            senderID: this.props.currentUser.uid,
            receiverID: this.props.recipientID,
            message: this.state.textAreaVal
        }
        this.setState({ textAreaVal: "" })
        console.log(messageData, 'messageDatamessageData');
        this.props.sendMessage(messageData);
    }
    render() {
        console.log(this.props.messages, 'aaaaaaaaaa')
        console.log(this.props.recipientID, this.props.currentUser.uid)
        return (
            <div>
                <textarea value={this.state.textAreaVal} onChange={this._textAreaHandler.bind(this)}></textarea>
                <button onClick={this.sendMessage.bind(this)}>send</button>
                {


                    <ul style={{ listStyleType: 'none' }}> {this.props.messages.map((msg, ind) => {
                        return <li key={ind}>
                            {
                                ((this.props.currentUser.uid == msg.senderID && this.props.recipientID == msg.receiverID) || (this.props.recipientID == msg.senderID && this.props.currentUser.uid == msg.receiverID)) ?
                                    <p>{msg.message}</p>
                                    : null
                            }
                        </li>

                    })}
                    </ul>
                }


            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        currentUser: state.signinReducer.currentUser,
        recipientID: state.signinReducer.recipientID,
        messages: state.signinReducer.messages
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())},
        sendMessage: (msg) => {
            dispatch(sendMessage(msg));
        }
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(ChatBox);
