import actioncable from 'actioncable'

export default actioncable.createConsumer('wss://dry-fjord-28793.herokuapp.com/cable')