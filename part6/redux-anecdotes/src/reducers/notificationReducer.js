import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return action.payload
    }
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const createNotification = (notification, time) => {
  return async dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      notification = null
      dispatch(clearNotification(notification))
    }, time * 1000)
  }
}

export default notificationSlice.reducer