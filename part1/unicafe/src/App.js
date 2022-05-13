import { useState } from 'react'


const Display = (props) => {
  console.log(props)
  if (props.value === 0) {
    return (
      <div>
      </div>
    )
  }

  return (
  <div>
    {props.text} {props.value}
  </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const texts = ['good', 'neutral', 'bad']
  const feedback="give feedback"
  const statistics="statistics"

  const setToGood = () => setGood(good + 1)

  const setToNeutral = () => setNeutral(neutral + 1)

  const setToBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>{feedback}</h2>
      <Button handleClick={setToGood} text={texts[0]} />
      <Button handleClick={setToNeutral} text={texts[1]} />
      <Button handleClick={setToBad} text={texts[2]} />
      <h2>{statistics}</h2>
      <Display text={texts[0]} value={good} />
      <Display text={texts[1]} value={neutral} />
      <Display text={texts[2]} value={bad} />
    </div>
  )
}

export default App
