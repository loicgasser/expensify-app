import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route component={(props) => {
        if (isAuthenticated) {
            return (
                <div>
                    <Header></Header>
                    <Component {...props}></Component>
                </div>
            )
        } else {
            return <Redirect to='/'></Redirect>
        }
    }} {...rest}></Route>
)

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.uid
    }
}

export default connect(mapStateToProps)(PrivateRoute)