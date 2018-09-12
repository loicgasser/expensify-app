import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'


export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}></PublicRoute>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}></PrivateRoute>
                <PrivateRoute path="/create" component={AddExpensePage}></PrivateRoute>
                <PrivateRoute path="/edit/:id" component={EditExpensePage}></PrivateRoute>
                <PrivateRoute component={NotFoundPage}></PrivateRoute>
            </Switch>
        </div>
    </Router>
)

export default AppRouter
