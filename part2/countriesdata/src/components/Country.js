const Country = ({ country, countriesArray }) => {
    console.log('Country component languages', country.languages)
    
    if (countriesArray.length > 1) {
      return (
        <div><b>{country.name.common}</b></div>
      )
    } 
    else {
      
      return (
        <div>
          <h2>{country.name.common}</h2>
          <b>
            capital {country.capital} <br/>
            area {country.area} <br/>       
          <p>languages:</p> 
          <ul>
            {Object.values(country.languages).map(language => 
              <li key={language}>
              {language}
              </li>
            )}
          </ul>
          </b>
          <p><img src={country.flags.png} alt=".png" height={150} width={150} /></p>
        </div>
      )
    }
  }

  export default Country