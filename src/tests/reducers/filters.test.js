import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('Should setup default value', () => {
    const state = filtersReducer(undefined, { type: 'DUMMY' })
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('Should setup sort by amount', () => {
    const state = filtersReducer(undefined, {
        type: 'SORT_BY_AMOUNT', sortBy: 'amount'
    })
    expect(state).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('Should setup sort by date', () => {
    const state = filtersReducer({
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined       
    }, {
        type: 'SORT_BY_DATE', sortBy: 'date'
    })
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    })
})

test('Should setup set text filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER', text: 'credit'
    })
    expect(state).toEqual({
        text: 'credit',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('Should setup set start date filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE', startDate: moment(0)
    })
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: moment().endOf('month')
    })
})

test('Should setup set end date filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE', endDate: moment(0)
    })
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment(0)
    })
})