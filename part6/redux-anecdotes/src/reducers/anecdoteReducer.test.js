import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action anecdotes/createAnecdote', () => {
    const state = []
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: 'the app state is in redux store',
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    console.log(newState)
    expect(newState).toHaveLength(2)
  })

  test('returns new state with action anecdotes/voteFor', () => {
    const state = [
      {
        content: 'the app state is in redux store',
        id: 400000,
        votes: 0
      },
      {
        content: 'state changes are made with actions',
        id: 34343,
        votes: 0
      }
    ]
    const action = {
      type: 'anecdotes/voteFor',
      payload: state[1]
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    console.log(newState)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'the app state is in redux store',
      id: state[0].id,
      votes: 0
    })
  })
})