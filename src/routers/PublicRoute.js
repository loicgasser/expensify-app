import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route component={(props) => {
        if (isAuthenticated) {
            return <Redirect to='/dashboard'></Redirect>
        } else {
            return (
                <Component {...props}></Component>
            )
        }
    }} {...rest}></Route>
)

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid
    }
}

export default connect(mapStateToProps)(PublicRoute)