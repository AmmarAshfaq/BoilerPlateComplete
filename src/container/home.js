import React, { Component } from 'react';
import configDefault from '../store/action/firebaseConfig';
import { logoutRequestAsync } from '../store/action/logoutAction';
import { connect } from 'react-redux';
import MobileTearSheet from '../components/MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import { pinkA200, transparent } from 'material-ui/styles/colors';
import ChatBox from './chatBoc';
import { recipient } from '../store/action/siginAction';

class Home extends Component {


    relatedId = (id) => {
        // console.log("open",id,this.props.currentUserData.uid)
        this.props.recipientId(id);
    }
    render() {
        // console.log("Data from user:", this.props.currentUserData.uid);
        // console.log("All user info:", this.props.allUserData.uid);
        return (
            <div >
                <div style={{ width: '60%', float: 'left' }}>
                    <ChatBox />
                    {/* <DrawerList  /> */}
                </div>
                <div style={{ width: '25%', float: 'right' }}> {
                    <MobileTearSheet >
                        <h4 style={{textAlign:'center'}}> All Users</h4>
                        <List>
                            {this.props.allUserData.map((data, index) => {
                                return <ListItem
                                    key={index}
                                    primaryText={data.name}
                                    leftIcon={<ActionGrade color={pinkA200} />}
                                    rightAvatar={<Avatar src="images/chexee-128.jpg"
                                    />}
                                    onClick={this.relatedId.bind(this, data.uid)}

                                />

                            })

                            }
                        </List>
                    </MobileTearSheet>

                }
                </div>



            </div>
        )
    }
}


function mapStateToProps(state) {
    return ({
        currentUserLogout: state.logoutReducer.currentUser,
        currentUserData: state.signinReducer.currentUser,
        allUserData: state.signinReducer.allUser
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        logoutUser: () => {
            dispatch(logoutRequestAsync())
        },
        recipientId: (idVal) => {
            dispatch(recipient(idVal))
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);