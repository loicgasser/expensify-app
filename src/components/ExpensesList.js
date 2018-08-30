import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import ExpenseListFilters from './ExpenseListFilters'
import getVisibleExpenses from '../selector/expenses'

export const ExpensesList = (props) => (
    <div>
        <ExpenseListFilters />
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem
                        key={expense.id}
                        {...expense}
                    />
                })
            )
        }
        
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    }
}

export default connect(mapStateToProps)(ExpensesList)