import { createStore } from 'redux'


// Action generators

const incrementCount = (({ incrementBy = 1 } = {}) => (
    {
        type: 'INCREMENT',
        incrementBy
    }
))

const decrementCount = (({ decrementBy = 1 } = {}) => (
    {
        type: 'DECREMENT',
        decrementBy
    }
))

const setCount = ({ count = 0 }) => (
    {
        type: 'SET',
        count
    }
)

const resetCount = () => (
    {
        type: 'RESET'
    }
)

// Reducer
// 1. reducers are pure functions (do not change anyhting outside the scope of the function)
// 2. never change state or action

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return { count: 0 }
        default:
            return state
    }
}

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
    console.log('Unsubscribe counter')
})

store.dispatch(setCount({ count: 101 }))
store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(decrementCount())
store.dispatch(decrementCount({ decrementBy: 10 }))

//store.dispatch(resetCount())

console.log(store.getState())