// Set text filter

export const setTextFilter = (text = '') => (
    {
        type: 'SET_TEXT_FILTER',
        text
    }
)

// Sort by date

export const sortByDate = () => (
    {
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    }
)

// Sort by amount

export const sortByAmount = () => (
    {
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    }
)

// Set start date

export const setStartDate = (startDate) => (
    {
        type: 'SET_START_DATE',
        startDate
    }

)

// Set end date

export const setEndDate = (endDate) => (
    {
        type: 'SET_END_DATE',
        endDate
    }

)

// Combined reducers

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        const startDateMatch = typeof startDate !== 'number' ||  expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt > b.createdAt ? 1 : -1
        } else if (sortBy == 'amount') {
            return a.amount > b.amount ? 1 : -1
        }
    })
}