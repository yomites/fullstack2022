import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const newPerson = {
      name: newName, phone: newNumber
    }

    if (newPerson.name === '' || newPerson.phone === '') {
      window.alert('Name or phone number can not be empty')
    }
    else if (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
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

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
      {persons.map(person => 
        <Person key={person.name} person={person} />  
      )}
    </div>
  )
}

export default App