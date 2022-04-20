
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    count: 0
}

const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state){
            state.push(state.count++)
        },
        decrement(state){
            state.push(state.count--)
        }
    }
})

export default CounterSlice.reducer