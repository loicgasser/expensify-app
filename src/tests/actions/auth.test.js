import { login , logout } from '../../actions/auth'

test('Should return the login object', () => {
    const uid = '123'
    const action = login(uid)
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    })
})

test('Should return the logout object', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})