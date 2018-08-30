import React from 'react'
import { shallow } from 'enzyme'
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