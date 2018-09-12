import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export class LoginPage extends React.Component {
    onClick = () => {
        this.props.startLogin()
    }
    render() {
        return (
            <button onClick={this.onClick}>Login</button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: () => dispatch(startLogin())
    }
}

export default connect(undefined, mapDispatchToProps)(LoginPage)