import authReducer from '../../reducers/auth'

test('Should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: '123'
    }
    const state = authReducer({}, action)
    expect(state.uid).toBe('123')
})

test('Should remove uid for login', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid: '123' }, action)
    expect(state).toEqual({})
})