import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [nameToShow, setNameToShow] = useState([])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const newPerson = {
      name: newName, number: newNumber
    }

    const duplicate = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (newPerson.name === '' || newPerson.number === '') {
      window.alert('Name or phone number can not be empty')
    }
    else if (duplicate !== undefined) {
      window.alert(`${newPerson.name} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } 
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')  
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSearchChange = (event) => {
    const arr = persons.filter(element =>
      element.name.toUpperCase().includes
        (event.target.value.toUpperCase()))
    console.log(event.target.value)
    setNameSearch(event.target.value)
    setNameToShow(arr)
  }

  const personsArray = (nameSearch === '') ? persons : nameToShow

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input value={nameSearch}
          onChange={handleSearchChange}  />
        </div>
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
      <h2>Numbers</h2>
      {personsArray.map(person => 
        <Person key={person.name} person={person} />  
      )}
    </div>
  )
}

export default App