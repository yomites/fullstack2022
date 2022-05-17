const Filter = ({ countrySearch, handleCountryChange }) => {

    return (
      <div>
        <b>find countries</b> <input value={countrySearch} onChange={handleCountryChange} />
      </div>
    )
  }
  
  export default Filter