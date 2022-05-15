const AddPersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  
    return (
      <div>
        <form onSubmit={addPerson}> 
        <h2>add a new</h2>
          <div>
            name: <input value={newName}
            onChange={handleNameChange} />
          </div>
          <div>number: <input value={newNumber} 
            onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

  export default AddPersonForm