import { useState, useEffect } from 'react'
import personService from './services/person'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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

      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')  
        setNewNumber('')
      })      
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNameSearch(event.target.value)
  }

  const personsArray = nameSearch ? persons.filter(element => element.name.toUpperCase().includes
      (nameSearch.toUpperCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameSearch={nameSearch} handleSearchChange={handleSearchChange} />

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber} 
        handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons personsArray={personsArray} />
    </div>
  )
}

export default App