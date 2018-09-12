import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { 
    addExpense,
    startAddExpense, 
    removeExpense,
    startRemoveExpense,
    startEditExpense,
    editExpense,
    setExpenses,
    startSetExpenses } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, amount, note, createdAt }) => {
        expensesData[id] = { description, amount, note, createdAt }
    })
    database.ref().set({ expenses: expensesData }).then(() => done())
})


test('Should setup default startAddExpense object', (done) => {
    const expenseDefault = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    const store = mockStore({})
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault)
        done()
    })
})

test('Should add expense to database and store', (done) => {
    const store = mockStore({})
    const expenseData = {
        description: 'zebra',
        note: 'small note',
        amount: 40000,
        createdAt: 3000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('Should setup addExpense object', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('Should setup removeExpense object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('Should delete data from firebase with startRemoveExpense', (done) => {
    const store = mockStore({})
    const id = expenses[0].id
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        })
        return database.ref(`expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBe(null)
        done()
    })
})

test('Should setup editExpense object', () => {
    const action = editExpense('123abc', { description: 'My dummy desc', amount: 1200 } )
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            description: 'My dummy desc',
            amount: 1200
        }
    })
})

test('Should edit expense data in firebase with startEditExpense', (done) => {
    const store = mockStore({})
    const updates = { amount: 666 }
    const id = expenses[1].id
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
        return database.ref(`expenses/${id}`).once('value')
    }).then((snapshot) => {
        const expense = snapshot.val()
        expect(expense.amount).toBe(updates.amount)
        done()
    })
})

test('Should return setExpenses action with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('Should fetch data from firebase', (done) => {
    const store = mockStore({})
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done()
    })
})