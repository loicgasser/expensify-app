import React from 'react'
import { Header } from '../../components/Header'
import { shallow } from 'enzyme'

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
})

test('Should call startLogout on button click', () => {
    const startLogout = jest.fn()
    const wrapper = shallow(<Header startLogout={startLogout}></Header>)
    wrapper.find('button').simulate('click')
    expect(startLogout).toHaveBeenCalled()
})