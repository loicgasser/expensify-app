import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import ExpenseListFilters from './ExpenseListFilters'
import getVisibleExpenses from '../selector/expenses'

const ExpensesList = (props) => (
    <div>
        <h1>This is a list of expenses:</h1>
        <ExpenseListFilters />
        {props.expenses.map((expense) => {
            return <ExpenseListItem
                key={expense.id}
                {...expense}
            />
        })}
        
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpensesList)