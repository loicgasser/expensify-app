import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm correctly with an expense', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
    const newDescription = 'new description'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change',
        {
            target: {
                value: newDescription
            } 
        }
    )
    expect(wrapper.state('description')).toBe(newDescription)
})

test('should set note on textarea change', () => {
    const newNote = 'new description'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change',
        {
            target: {
                value: newNote
            } 
        }
    )
    expect(wrapper.state('note')).toBe(newNote)
})

test('should set amount on input change if valid amount', () => {
    const newAmount = '112.22'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change',
        {
            target: {
                value: newAmount
            } 
        }
    )
    expect(wrapper.state('amount')).toBe(newAmount)
})

test('should not set amount on input change if amount is invalid', () => {
    const newAmount = '11g2.22'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change',
        {
            target: {
                value: newAmount
            } 
        }
    )
    expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit for valid form submission', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    })
})

test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set focus on change', () => {
    const focus = { focused: true }
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')(focus)
    expect(wrapper.state('focused')).toBe(true)
})