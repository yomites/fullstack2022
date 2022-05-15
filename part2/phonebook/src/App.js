import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const newPerson = {
      name: newName
    }

    if (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      window.alert(`${newPerson.name} is already added to phonebook`)
      setNewName('')
    } 
    else {
      setPersons(persons.concat(newPerson))
      setNewName('')    
    }
  }

  const handlePersonNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handlePersonNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person key={person.name} person={person} />  )}
    </div>
  )
}

export default App