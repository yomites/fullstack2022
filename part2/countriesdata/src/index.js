import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)


const obj1 = {fra: 'French', gsw: 'Swiss German', ita: 'Italian', roh: 'Romansh'}

// // const objarr = obj1.map(ob => ob["val"])
// // console.log(obj1.fra)

Object.entries(obj1).forEach(
  ([key]) => console.log(obj1[key])
)
