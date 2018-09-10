import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary with expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary with no expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[]} />)
    expect(wrapper).toMatchSnapshot()
})