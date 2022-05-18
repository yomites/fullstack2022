import Country from "./Country"

const Countries = ({ countriesArray, countrySearch, setCountrySearch }) => {
    
    if (countrySearch === '') {
      return (
        <div></div>
      )
    } 
    else 
    {
      if (countriesArray.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
      }
      else if (countriesArray.length > 1 && countriesArray.length <= 10) {
        return (
          <div>
            {countriesArray.map(country => 
            <Country key={country.name.common} country={country} 
              countriesArray={countriesArray} setCountrySearch={setCountrySearch} /> )}
          </div>
        )
      } 
      else {
        return (
          <div>
            {countriesArray.map(country => 
            <Country key={country.name.common} country={country} 
              countriesArray={countriesArray} setCountrySearch={setCountrySearch} /> 
            )}
          </div>
      )}
    }
  }

  export default Countries