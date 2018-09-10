import expenses from '../fixtures/expenses'
import sumExpenses from '../../selector/expenses-total'


test('Should return 0 if no expenses', () => {
    expect(sumExpenses([])).toBe(0)
})

test('Should correctly add a single expense', () => {
    expect(sumExpenses([expenses[0]])).toBe(expenses[0].amount)
})

test('Should correctly add several expenses', () => {
    let total = 0
    expenses.forEach((expense) => {
        total += expense.amount
    })
    expect(sumExpenses(expenses)).toBe(total)
})