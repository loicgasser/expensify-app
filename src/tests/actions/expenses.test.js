import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, startAddExpense, removeExpense, editExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)


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