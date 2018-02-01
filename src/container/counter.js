import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../store/action/action';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    centerValue :{
        margin:'0px auto',
        width:'100%'
    }
}
class Counter extends Component {
    incrementValue = () => {
        this.props.incrementVal()
    }
    decrementValue = () => {
        this.props.decrementVal()
    }
    render() {
        console.log(this.props.counterValue);
        return (
            <div style={styles.centerValue}>
                <h1>{this.props.counterValue}</h1>
                
                <RaisedButton label="Increment" primary={true}  onClick={this.incrementValue.bind(this)}/>
                <RaisedButton label="Decrement" secondary={true}  onClick={this.decrementValue.bind(this)} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return ({
        counterValue: state.reducer.count
    })
}
function mapDispatchToProps(dispatch) {
    return ({
        incrementVal: () => {
            dispatch(increment())
        },
        decrementVal: () => {
            dispatch(decrement());
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);