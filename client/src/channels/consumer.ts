import actioncable from 'actioncable'

export default actioncable.createConsumer('wss://dry-fjord-28793.herokuapp.com/cable')
// export default actioncable.createConsumer('ws://127.0.0.1:3000/cable')