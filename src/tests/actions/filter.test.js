import moment from 'moment'
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters'

test('Should setup default setTextFilter object', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('Should setup default setTextFilter object', () => {
    const action = setTextFilter('abc')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'abc'
    })
})

test('Should setup sortByDate object', () => {
    const action = sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    })
})

test('Should setup sortByAmount object', () => {
    const action = sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    })
})

test('Should setup setStartDate object', () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('Should setup setEndDate object', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})