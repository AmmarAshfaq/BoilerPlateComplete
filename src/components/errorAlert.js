import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
export default class ErrorAlert extends Component {
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.handleClose}
            />
        ]
        return (
            <div>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                >
                    {this.props.errorText}
                </Dialog>

            </div>
        )
    }
}