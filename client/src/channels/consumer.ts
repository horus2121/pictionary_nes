import actioncable from 'actioncable'

export default actioncable.createConsumer('ws://dry-fjord-28793.herokuapp.com/cable')