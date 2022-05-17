import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [countrySearch, setCountrySearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  console.log('render', countries.length, 'countries')

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountrySearch(event.target.value)
  }

  const countriesArray = countries.filter(element => element.name.common.toUpperCase().includes
      (countrySearch.toUpperCase()))

  return (
    <div>
      <Filter countrySearch={countrySearch} handleCountryChange={handleCountryChange} />
      <Countries countriesArray={countriesArray.sort()} countrySearch={countrySearch} />
    </div>
  )
}

export default App
