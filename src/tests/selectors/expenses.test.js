import moment from 'moment'
import selectExpenses from '../../selector/expenses'
import expenses from '../fixtures/expenses'

test('Should filter by text value and sort by date', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const results = selectExpenses(expenses, filters)
    expect(results).toEqual([expenses[2], expenses[1]])
})

test('Should filter by start date and sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const results = selectExpenses(expenses, filters)
    expect(results).toEqual([expenses[2], expenses[0]])
})

test('Should filter by end date and sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }
    const results = selectExpenses(expenses, filters)
    expect(results).toEqual([expenses[0], expenses[1]])
})

test('Should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const results = selectExpenses(expenses, filters)
    expect(results).toEqual([expenses[1], expenses[2], expenses[0]])
})

test('Should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const results = selectExpenses(expenses, filters)
    expect(results).toEqual([expenses[2], expenses[0], expenses[1]])
})