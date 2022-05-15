const Search = ({ nameSearch, handleSearchChange }) => {

    return (
      <div>
        <h2>Phonebook</h2>
        filter shown with <input value={nameSearch} onChange={handleSearchChange}  />
      </div>
    )
  }

  export default Search