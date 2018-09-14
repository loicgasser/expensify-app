import React from 'react'
import { LoginPage } from '../../components/LoginPage'
import { shallow } from 'enzyme'

test('should render LoginPage correctly', () => {
    const wrapper = shallow(<LoginPage />)
    expect(wrapper).toMatchSnapshot()
})

test('Should call startFacebookLogin on button click', () => {
    const startFacebookLogin = jest.fn()
    const wrapper = shallow(<LoginPage startFacebookLogin={startFacebookLogin}></LoginPage>)
    wrapper.find('.button--facebook').simulate('click')
    expect(startFacebookLogin).toHaveBeenCalled()
})

test('Should call startGoogleLogin on button click', () => {
    const startGoogleLogin = jest.fn()
    const wrapper = shallow(<LoginPage startGoogleLogin={startGoogleLogin}></LoginPage>)
    wrapper.find('.button--google').simulate('click')
    expect(startGoogleLogin).toHaveBeenCalled()
})