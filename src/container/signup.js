import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { signup,signupErrorAlert } from '../store/action/signupAction';
import { browserHistory } from 'react-router';
import ErrorAlert from '../components/errorAlert';

const styles = {
    textStyle: {
        width: '100%'
    },
    button: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px'
    },
    paper: {
        height: '100%',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        display: 'inline-block',
        padding: '40px'
    },
    paperWapper: {
        width: '70%',
        margin: '0 auto',
        marginTop: 100

    },
    heading: {
        color: '#212121'
    }
}

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: ''
        }
    }

    updateValue = (ev, target) => {
        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    signUp = () => {
        let obj = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
        }

        this.props.signupAction(obj);
    }
    signIn = () => {
        browserHistory.push('/signin');
    }
    dispatchClose = () => {
        this.props.closeAlert();
    }
    render() {
        // console.log('Progressing in signup: ', this.props.isProgressing);
        // console.log('error alert info: ', this.props.errorText, this.props.isError);
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />
                {
                    this.props.isProgressing ?
                        <CircularProgress style={{ margin: '50%' }} size={80} />
                        : (<div style={styles.paperWapper}>
                            <Paper style={styles.paper} zDepth={4} >
                                <h1 style={styles.heading}>SignUp</h1>
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'username') }}
                                    value={this.state.name}
                                    style={styles.textStyle}
                                    type='text'
                                    hintText=""
                                    floatingLabelText="Name*"
                                />
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'email') }}
                                    value={this.state.email}
                                    style={styles.textStyle}
                                    type='email'
                                    hintText=""
                                    floatingLabelText="Email*"
                                /><br />
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'password') }}
                                    value={this.state.password}
                                    style={styles.textStyle}
                                    type='password'
                                    hintText=""
                                    floatingLabelText="Password"
                                /><br />
                                <RaisedButton onClick={this.signUp} label="Submit" primary={true} style={styles.button} />
                                <RaisedButton onClick={this.signIn} label="Login" primary={true} style={styles.button} />
                            </Paper>
                        </div>)}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return ({
        currentUser: state.signupReducer.currentUser,
        isProgressing: state.signupReducer.isProgress,
        isError: state.signupReducer.isError,
        errorText: state.signupReducer.errorText
    })
}
function mapDispatchToProps(dispatch) {
    return ({
        signupAction: (obj) => {
            dispatch(signup(obj))
        },
        closeAlert : () => dispatch(signupErrorAlert())
        
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);