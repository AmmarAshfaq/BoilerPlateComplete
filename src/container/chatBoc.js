import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendMessage, editItem, deleteItem } from '../store/action/siginAction'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaVal: '',
            editItem: '',
            editBool: false,
            compId: '',
            fbInd: ''

        }
    }
    _textAreaHandler(event) {
        this.setState({
            textAreaVal: event.target.value
        })
    }
    deleteItem(mapId, fbId) {
        this.props.deleteItem(mapId, fbId);
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
    editItem(mapId, fbId, data) {
        console.log(mapId)
        this.setState({
            editBool: true,
            editItem: data,
            compId: mapId,
            fbInd: fbId

        })
    }
    updateAction() {
        console.log(this.state.compId, this.state.fbInd, this.state.editItem);
        this.props.editText(this.state.compId, this.state.fbInd, this.state.editItem);
        this.setState({
            editItem: '',
            compId: '',
            fbInd: '',
            editBool: false
        })
    }
    updateValue(event) {
        this.setState({
            editItem: event.target.value
        })
    }
    render() {
        console.log(this.props.messages, 'aaaaaaaaaa')
        console.log(this.props.recipientID, this.props.currentUser.uid)
        return (
            <div>
                <Card style={{ marginTop: '18px', marginLeft: '20px' }}>
                    <CardHeader
                        title="Chat Box"
                        style={{ fontSize: '42px', fontWeight: 'bold' }}

                    />

                    {


                        <ul style={{ listStyleType: 'none' }}> {this.props.messages.map((msg, ind) => {
                            return <li key={ind}>
                                {
                                    ((this.props.currentUser.uid == msg.senderID && this.props.recipientID == msg.receiverID) || (this.props.recipientID == msg.senderID && this.props.currentUser.uid == msg.receiverID)) ?
                                        (this.props.currentUser.uid == msg.senderID && this.props.recipientID == msg.receiverID) ?
                                            <div >
                                                {console.log(ind, "index", "message", msg.id)}
                                                {
                                                    (!this.state.editBool) ?
                                                        <div key={ind}>

                                                            <span>
                                                                You: {msg.message}
                                                                <button onClick={this.deleteItem.bind(this, ind, msg.id)}>Delete</button>
                                                                <button onClick={this.editItem.bind(this, ind, msg.id, msg.message)}>Edit</button>

                                                            </span>

                                                            <br />
                                                        </div>
                                                        : <div key={ind}>
                                                            <span>
                                                                <input type="text" value={this.state.editItem} onChange={this.updateValue.bind(this)} />
                                                                <button onClick={this.updateAction.bind(this)}>Update</button>
                                                            </span>
                                                        </div>
                                                }
                                            </div>

                                            :
                                            <div>
                                                {
                                                    (!this.state.editBool) ?
                                                        <div >
                                                            <span style={{ float: 'right' }}>

                                                                Reciever: {msg.message}
                                                                <button onClick={this.deleteItem.bind(this, ind, msg.id)}>Delete</button>
                                                                <button onClick={this.editItem.bind(this, ind, msg.id, msg.message)}>Edit</button>

                                                            </span>

                                                            <br />
                                                        </div>
                                                        :
                                                        <div key={ind}>
                                                            <span>
                                                                <input type="text" value={this.state.editItem} onChange={this.updateValue.bind(this)} />
                                                                <button onClick={this.updateAction.bind(this)}>Update</button>
                                                            </span>
                                                        </div>
                                                }
                                            </div>
                                        : null
                                }
                            </li>

                        })}
                        </ul>
                    }
                    <hr />
                    <div style={{ width: '100%', }}>
                        <div style={{ width: '90%', display: 'inline-block', marginBottom: '6px' }}>
                            <TextField
                                hintText="Send Message"
                                fullWidth={true}
                                value={this.state.textAreaVal}
                                onChange={this._textAreaHandler.bind(this)}
                                multiLine={true}

                            />
                        </div>
                        {/* <textarea value={this.state.textAreaVal} onChange={this._textAreaHandler.bind(this)}></textarea> */}

                        <div style={{ width: '10%', display: 'inline-block', textAlign: 'center' }}>
                            <FloatingActionButton onClick={this.sendMessage.bind(this)} mini={true}>
                                <ContentAdd />
                            </FloatingActionButton>
                            {/* <button onClick={this.sendMessage.bind(this)}>send</button> */}
                        </div>
                    </div>
                </Card>
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
        },
        deleteItem: (mapId, fbId) => {
            dispatch(deleteItem(mapId, fbId));
        },
        editText: (mapId, fbId, item) => {
            dispatch(editItem(mapId, fbId, item));
        }

    })
}
export default connect(mapStateToProp, mapDispatchToProp)(ChatBox);
