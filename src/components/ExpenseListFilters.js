import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'
import { DateRangePicker } from 'react-dates'

class ExpenseListFilters extends React.Component {
    state = {
        focusedInput: null
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.props.filters.text}
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value))
                    }}
                />
                <select
                    values={this.props.filters.sortBy}
                    onChange={(e) => {
                        const value = e.target.value
                        if (value === "date") {
                            this.props.dispatch(sortByDate())
                        } else if (value === "amount") {
                            this.props.dispatch(sortByAmount())
                        }
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId="startDateId"
                    endDate={this.props.filters.endDate}
                    endDateId="endDateId"
                    onDatesChange={({ startDate, endDate }) => {
                        this.props.dispatch(setStartDate(startDate))
                        this.props.dispatch(setEndDate(endDate))
                    }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={(focusedInput) => this.setState({ focusedInput })}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters)