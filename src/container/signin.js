import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { login, loginErrorAlert } from '../store/action/siginAction';
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

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }
    register = () => {
        browserHistory.push('/signup');
    }
    updateValue = (ev, target) => {
        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    signIn = () => {
        let obj = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.signinAction(obj);
    }

    dispatchClose = () => {
        this.props.closeAlert();
    }
    render() {
        // console.log('Progressing in signin: ', this.props.isProgressing);
        // console.log("Error status :", this.props.isError, this.props.errorText)
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />
                {
                    this.props.isProgressing ?
                        <CircularProgress style={{ margin: '50%' }} size={80} />
                        : (<div style={styles.paperWapper}>
                            <Paper style={styles.paper} zDepth={4} >
                                <h1 style={styles.heading}>SignIn</h1>
                                {/* <TextField
                                    onChange={(event) => { this.updateValue(event, 'username') }}
                                    value={this.state.name}
                                    style={styles.textStyle}
                                    type='text'
                                    hintText=""
                                    floatingLabelText="Name*"
                                /> */}
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
                                <RaisedButton onClick={this.signIn} label="Login" primary={true} style={styles.button} />
                                <RaisedButton onClick={this.register} label="Register" primary={true} style={styles.button} />
                            </Paper>
                        </div>)}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return ({
        currentUser: state.signinReducer.currentUser,
        isProgressing: state.signinReducer.isProgress,
        isError: state.signinReducer.isError,
        errorText: state.signinReducer.errorText
    })
}
function mapDispatchToProps(dispatch) {
    return ({
        signinAction: (obj) => {
            dispatch(login(obj))
        },
        closeAlert: () => dispatch(loginErrorAlert())

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);