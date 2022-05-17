import Country from "./Country"

const Countries = ({ countriesArray, countrySearch }) => {
    if (countrySearch === '') {
      return (
        <div></div>
      )
    } 
    else 
    {
      if (countriesArray.length >= 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
      }
      else if (countriesArray.length > 1 && countriesArray.length < 10) {
        return (
          <div>
            {countriesArray.map(country => 
            <Country key={country.name.common} country={country} 
              countriesArray={countriesArray} /> )}
          </div>
        )
      } 
      else {
        return (
          <div>
            {countriesArray.map(country => 
            <Country key={country.name.common} country={country} 
              countriesArray={countriesArray} /> 
            )}
          </div>
      )}
    }
  }

  export default Countries