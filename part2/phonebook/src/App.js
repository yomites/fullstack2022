import { useState } from 'react'
import Persons from './components/Persons'
import Search from './components/Search'
import AddPersonForm from './components/AddPersonForm'


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
      <Search nameSearch={nameSearch} handleSearchChange={handleSearchChange} />
      <AddPersonForm addPerson={addPerson} newName={newName} 
        handleNameChange={handleNameChange} newNumber={newNumber} 
        handleNumberChange={handleNumberChange} />
      <Persons personsArray={personsArray} />
    </div>
  )
}

export default App