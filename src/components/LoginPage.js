import React from 'react'
import { connect } from 'react-redux'
import { startFacebookLogin, startGoogleLogin } from '../actions/auth'

export class LoginPage extends React.Component {
    onClickFacebook = () => {
        this.props.startFacebookLogin()
    }
    onClickGoogle = () => {
        this.props.startGoogleLogin()
    }
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Expensify</h1>
                    <p>It's time to get your expenses under control!</p>
                    <div className="box-layout__buttons">
                        <button className="button button--facebook" onClick={this.onClickFacebook}>Login with Facebook</button>
                        <br></br>
                        <button className="button button--google" onClick={this.onClickGoogle}>Login with Google</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startFacebookLogin: () => dispatch(startFacebookLogin()),
        startGoogleLogin: () => dispatch(startGoogleLogin())
    }
}

export default connect(undefined, mapDispatchToProps)(LoginPage)