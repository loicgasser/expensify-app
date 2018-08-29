import { addExpense, removeExpense, editExpense } from '../../actions/expenses'

test('Should setup default addExpense object', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    })
})

test('Should setup addExpense object', () => {
    const expenseData = {
        description: 'Dummy',
        note: 'My note',
        amount: 100,
        createdAt: 1000
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
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