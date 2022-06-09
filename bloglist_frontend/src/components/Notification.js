const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const errorStyle = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontStyle: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={errorStyle} className='error'>
      {message.data}
    </div>
  )
}

export default Notification