import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

const demoState = {
    expenses: [
        {
            description: 'This a desc',
            note: 'this is a simple note about the expense',
            amount: 3838,
            createdAt: 0
        },
        {
            description: 'Drink',
            note: 'Drink with friends',
            amount: 2,
            createdAt: 1
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}

// Add expense

const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => (
        {
            type: 'ADD_EXPENSE',
            expense: {
                id: uuid(),
                description,
                note,
                amount,
                createdAt
            }
        }
    )

// Remove expense

const removeExpense = ({ id } = {}) => (
    {
        type: 'REMOVE_EXPENSE',
        id
    }
)

// Edit Expense

const editExpense = (id, updates) => (
    {
        type: 'EDIT_EXPENSE',
        id,
        updates

    }
)

////////////////////////////////
// Expense reducer

const expensesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                return expense
            })
/*         case 'SORT_BY_AMOUNT':
            const newAmountState = [...state]
            newAmountState.sort((a, b) => {
                return a.amount > b.amount ? 1 : -1
            })
            return newAmountState
        case 'SORT_BY_DATE':
            let newDateState = [...state]
            newDateState.sort((a, b) => {
                return a.createdAt > b.createdAt ? 1 : -1
            })
            return newDateState */
        default:
            return state
    }
}


//////////////////////////////
// Filter reducer


// Set text filter

const setTextFilter = (text = '') => (
    {
        type: 'SET_TEXT_FILTER',
        text
    }
)

// Sort by date

const sortByDate = () => (
    {
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    }
)

// Sort by amount

const sortByAmount = () => (
    {
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    }
)

// Set start date

const setStartDate = (startDate) => (
    {
        type: 'SET_START_DATE',
        startDate
    }

)

// Set end date

const setEndDate = (endDate) => (
    {
        type: 'SET_END_DATE',
        endDate
    }

)

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

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

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

const unsubscribe = store.subscribe(() => {
    const state = store.getState()
    console.log(state)
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense(demoState.expenses[0]))
const expenseTwo = store.dispatch(addExpense(demoState.expenses[1]))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

store.dispatch(editExpense(expenseOne.expense.id, { amount: 400 }))

// store.dispatch(setTextFilter('rent'))

store.dispatch(sortByAmount())
store.dispatch(sortByDate())

//store.dispatch(setStartDate(-1))
//store.dispatch(setEndDate(0))

//store.dispatch(setTextFilter('drink'))