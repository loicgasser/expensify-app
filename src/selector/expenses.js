// Function to filter and sort expenses getVisibleExpenses
import moment from 'moment'

export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        const createdAt = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAt, 'day') : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAt, 'day') : true
        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            // Order most recent to oldest
            return a.createdAt > b.createdAt ? -1 : 1
        } else if (sortBy == 'amount') {
            // Reverse order, biggest amount first
            return a.amount > b.amount ? -1 : 1
        }
    })
}