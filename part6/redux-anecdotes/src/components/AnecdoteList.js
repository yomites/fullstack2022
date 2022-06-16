import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = [ ...anecdotes ].sort((a, b) => b.votes - a.votes)

  return (sortedAnecdotes.map(a =>
    <Anecdote
      key={a.id}
      anecdote={a}
      vote={() => dispatch(voteFor(a.id))}
    />
  ))
}

export default AnecdoteList