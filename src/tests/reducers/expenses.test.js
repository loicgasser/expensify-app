import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('Should setup default state', () => {
    const state = expensesReducer(undefined, { type: 'DUMMY' })
    expect(state).toEqual([])
})

test('Should remove an expense by id', () => {
    const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: '2' })
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('Should not remove an expense if id not found', () => {
    const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: '-1' })
    expect(state).toEqual(expenses)
})

test('Should add an expense', () => {
    const expense = {
        id: '4',
        description: 'dummy',
        note: 'note me',
        amount: 200,
        createdAt: 600
    }
    const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense })
    expect(state).toEqual([...expenses, expense])
})

test('Should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '2',
        updates: {
            description: 'dummy'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state[1].description).toBe('dummy')
})

test('Should not edit an expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description: 'dummy'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('Should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses
    }
    const state = expensesReducer([expenses[0]], action)
    expect(state).toEqual(expenses)
})