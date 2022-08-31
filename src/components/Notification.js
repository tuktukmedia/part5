const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    border: '3px solid',
    padding: 10,
    fontSize: 18
  }
  return <div style={style}>{notification.message}</div>
}

export default Notification
