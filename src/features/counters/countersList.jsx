import React, {useState} from 'react'

export const CountersList = () => {
   const [count, setCount] = useState(0)
    
//    const increment = () => {
//        return setCount(previous => previous + 1)
//        }
//    const decrement = () => {
//        return setCount(previous => previous - 1)
//    }

    return (
        <div style={{width: '400px', margin: 'auto', border: '1px solid gray', display: 'flex', flexDirection: 'column', marginTop: '20px', padding: '10px', alignItems: 'center', justifyContent: 'center'}}>
          <h1>Counter:</h1>
          <span style={{fontSize: '2rem'}}>{count}</span>
          <button onClick={()=>{setCount(previous => previous + 1)}} type="button">Increment</button>
          <button onClick={()=>{setCount(previous => previous - 1)}} type="button">Decrement</button>
          <button onClick={()=>{setCount(0)}} type="button">Reset</button>
        </div>
    )
}

