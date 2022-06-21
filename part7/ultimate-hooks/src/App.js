/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useField, useResource } from './hooks'

const App = () => {
  const [contentReset, content] = useField('text')
  const [nameReset, name] = useField('text')
  const [numberReset, number] = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService.getAll().then((response) => {
      return response
    })
  }, [])

  useEffect(() => {
    personService.getAll().then((response) => {
      return response
    })
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    contentReset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    nameReset()
    numberReset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App