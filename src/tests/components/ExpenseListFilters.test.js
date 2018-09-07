import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, filtersAlt } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, onFocusChange, wrapper

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    onFocusChange = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onFocusChange={onFocusChange}
            filters={filters} />
    )
})

test('Should render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({ filters: filtersAlt })
    expect(wrapper).toMatchSnapshot()
})


test('Should handle setTextFilter', () => {
    wrapper.find('input').simulate('change', {
        target: {
            value: filtersAlt.text
        }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(filtersAlt.text)
})

test('Should handle sortByDate', () => {
    wrapper.find('select').simulate('change', {
        target: {
            value: filters.sortBy
        }
    })
    expect(sortByDate).toHaveBeenCalled()
})

test('Should handle sortByAmount', () => {
    wrapper.find('select').simulate('change', {
        target: {
            value: filtersAlt.sortBy
        }
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test('Should handle setStartDate and setEndDate', () => {
    const startDate = moment(0).add(3, 'years')
    const endDate = moment(0).add(4, 'years')
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('Should handle focus change', () => {
    const focusedInput = 'endDate'
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focusedInput)
    expect(wrapper.state('focusedInput')).toBe(focusedInput)
})