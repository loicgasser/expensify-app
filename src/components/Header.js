import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startLogout } from '../actions/auth'

export const Header = (props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <NavLink className="header__title" to="/dashboard">
                    <h1>Expensify</h1>
                </NavLink>
                <button className="button button--link" onClick={props.startLogout}>Logout</button>
            </div>
        </div>
    </header>
)

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    }
}

export default connect(undefined, mapDispatchToProps)(Header)