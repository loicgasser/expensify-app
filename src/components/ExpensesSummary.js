import React from 'react'
import { connect } from 'react-redux'
import sumExpenses from '../selector/expenses-total'
import numeral from 'numeral'

export class ExpensesSummary extends React.Component {
    render() {
        return (
            <p>
                Viewing {this.props.countExpenses} expenses totalling {numeral(this.props.sumExpenses / 100).format('$0,0.00')}
            </p>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        sumExpenses: sumExpenses(props.expenses),
        countExpenses: props.expenses.length
    }
}


export default connect(mapStateToProps)(ExpensesSummary)