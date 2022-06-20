import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      if (name !== '') {
        const promise = axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        promise.then(response => {
          setCountry(response.data[0])
        }).catch(error => {
          console.log('error', error)
          setCountry('')
        })
      }
  
    }, [name])
  
    return country
}