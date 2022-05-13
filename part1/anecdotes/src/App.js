import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}><b>{text}</b></button>
)

const Headings = ({ text }) => <div><h2>{text}</h2></div>
  

const VotesArray=(vote, index)=> {
  console.log(vote, index)
  const copy = [ ...vote ]
  copy[index] += 1
  return copy
}

const HighestVoteIndex=(vote)=> {
  const copy = [ ...vote ]
  const index=copy.indexOf(Math.max(...copy))
  return (
    index
  ) 
}

const AnecdoteAndVotesDisplay = (props) => {
  return (
    <div>
      <b>{props.anecdotes}</b><br />
      <b>has {props.votes} votes </b> <br />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const texts = ['next anecdote', 'vote', 'Anecdote of the day', 'Anecdote with most votes']

  const setToSelected = () => setSelected(Math.floor(Math.random() * anecdotes.length) + 0)
  console.log(selected)

  const handleVoteClick=() => setVotes(VotesArray(votes, selected))
  console.log('The value of the array and index', votes, selected)

  return (
    <div>
      <Headings text={texts[2]} />
      <AnecdoteAndVotesDisplay anecdotes={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text={texts[1]} />
      <Button handleClick={setToSelected} text={texts[0]} />
      <Headings text={texts[3]} />
      <AnecdoteAndVotesDisplay anecdotes={anecdotes[HighestVoteIndex(votes)]} 
          votes={votes[HighestVoteIndex(votes)]} />
    </div>
  )
}

export default App
