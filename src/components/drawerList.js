import React, { Component } from 'react';
import { connect } from 'react-redux';
import configDefault from '../store/action/firebaseConfig';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { browserHistory } from 'react-router';
import { logoutRequestAsync } from '../store/action/logoutAction';
import { allUserDelete} from '../store/action/siginAction';
const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};
class DrawerList extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            status: false
        }
        configDefault.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ status: true })
            }
            else {
                this.setState({ status: false })
            }
        })
    }
    signOut = () => {
        this.props.signOutUser();
        this.props.deleteAllUser();
        this.setState({ open: false })
    }
    handleToggle = () => this.setState({ open: !this.state.open });
    changeURL = (page) => {
        console.log(browserHistory.push('/'))
    }
    render() {
        // console.log(this.props.currentUser, this.props.dataUser)
        return (
            <div>
                <AppBar
                    title={this.props.dataUser}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <MenuItem onClick={this.changeURL}>Home</MenuItem>
                    <MenuItem onClick={this.changeURL}>About</MenuItem>
                    <MenuItem onClick={this.changeURL}>Chat</MenuItem>
                    {
                        this.state.status ?
                            <MenuItem onClick={this.signOut}>Logout</MenuItem>
                            : null
                    }
                </Drawer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        currentUser: state.logoutReducer.currentUser,
        dataUser: state.signinReducer.currentUser.name
    })
}
function mapDispatchToProps(dispatch) {
    return ({
        signOutUser: () => dispatch(logoutRequestAsync()),
        deleteAllUser:()=>dispatch(allUserDelete())
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerList);