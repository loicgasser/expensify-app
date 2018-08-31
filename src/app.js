import React from 'react'
import ReactDOM from 'react-dom'
import 'react-dates/initialize'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'

const store = configureStore()

store.dispatch(addExpense({ description: 'Gas bill', createdAt: moment().valueOf() }))
store.dispatch(addExpense({ description: 'Water bill', createdAt: moment().valueOf() ,amount: 2000 }))


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))