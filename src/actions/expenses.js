import database from '../firebase/firebase'
import { createDeflate } from 'zlib';

// Add expense

export const addExpense = (expense) => (
    {
        type: 'ADD_EXPENSE',
        expense
    }
)

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData
        const expense = { description, note, amount, createdAt }
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

// Remove expense

export const removeExpense = ({ id } = {}) => (
    {
        type: 'REMOVE_EXPENSE',
        id
    }
)

// Edit Expense

export const editExpense = (id, updates) => (
    {
        type: 'EDIT_EXPENSE',
        id,
        updates

    }
)

// Set Expenses

export const setExpenses = (expenses) => (
    {
        type: 'SET_EXPENSES',
        expenses
    }
)

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((dataSnapshot) => {
            const expenses = []
            const expensesData = dataSnapshot.val()
            Object.keys(expensesData).forEach((key) => {
                const { description, amount, createdAt, note } = expensesData[key]
                expenses.push({
                    id: key,
                    description,
                    amount,
                    createdAt,
                    note
                })
            })
            dispatch(setExpenses(expenses))
        })
    }
}