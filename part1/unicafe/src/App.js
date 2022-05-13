import { useState } from 'react'


const Statistics = (props) => {
  console.log(props)
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
  <div>
    {props.texts[0]} {props.good} <br/>
    {props.texts[1]} {props.neutral} <br/>
    {props.texts[2]} {props.bad} <br/>
    {props.texts[3]} {props.all} <br/>
    {props.texts[4]} {props.average} <br/>
    {props.texts[5]} {props.positive} <br/>
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
  const texts = ['good', 'neutral', 'bad', 'all', 'average', 'positive']
  const feedback="give feedback"
  const statistics="statistics"

  const setToGood = () => setGood(good + 1)
  const setToNeutral = () => setNeutral(neutral + 1)
  const setToBad = () => setBad(bad + 1)
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = (good * 100 / all) + ' %'

  return (
    <div>
      <h2>{feedback}</h2>
      <Button handleClick={setToGood} text={texts[0]} />
      <Button handleClick={setToNeutral} text={texts[1]} />
      <Button handleClick={setToBad} text={texts[2]} />
      <h2>{statistics}</h2>
      <Statistics texts={texts} good={good} neutral={neutral} 
          bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
