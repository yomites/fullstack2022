import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
            has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === null ) {
      return anecdotes
    }
    return anecdotes.filter(e => e.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const sortedAnecdotes = [ ...anecdotes ].sort((a, b) => b.votes - a.votes)

  return (sortedAnecdotes.map(a =>
    <Anecdote
      key={a.id}
      anecdote={a}
      vote={() => {dispatch(voteFor(a.id))
        dispatch(createNotification(`you voted ${a.content}`, 5))}}
    />
  ))
}

export default AnecdoteList