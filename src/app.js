import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const ExpenseDashboardPage = () => (
    <div>This is my dashboard component.</div>
)

const AddExpensePage = () => (
    <div>This is my expense component.</div>
)

const EditExpensePage = () => (
    <div>This is my edit component.</div>
)

const HelpExpensePage = () => (
    <div>This is my help component.</div>
)

const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} exact={true}></Route>
            <Route path="/create" component={AddExpensePage}></Route>
            <Route path="/edit" component={EditExpensePage}></Route>
            <Route path="/help" component={HelpExpensePage}></Route>
        </div>
    </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app'))