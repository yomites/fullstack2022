import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
    return (
      <div>
        {text} {value}
      </div>
    )
  }


const Statistics = ({ texts, good, neutral, bad, all, average, positive }) => {
  
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
  <div>
    <StatisticLine text={texts[0]} value={good} />
    <StatisticLine text={texts[1]} value={neutral} />
    <StatisticLine text={texts[2]} value={bad} />
    <StatisticLine text={texts[3]} value={all} />
    <StatisticLine text={texts[4]} value={average} />
    <StatisticLine text={texts[5]} value={positive} />
  </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
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
