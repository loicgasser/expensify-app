import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import selectExpenses from '../selector/expenses';
import sumExpenses from '../selector/expenses-total'
import numeral from 'numeral'

export class ExpensesSummary extends React.Component {
    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Viewing <span>{this.props.countExpenses}</span> expenses totalling <span>{numeral(this.props.sumExpenses / 100).format('$0,0.00')}</span></h1>
                    <div className="page-header__action">
                        <Link className="button" to="/create">Add Expense</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        sumExpenses: sumExpenses(visibleExpenses),
        countExpenses: visibleExpenses.length
    }
}


export default connect(mapStateToProps)(ExpensesSummary)