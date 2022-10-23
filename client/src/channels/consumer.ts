import actioncable from 'actioncable'

export default actioncable.createConsumer('ws://localhost:3000/cable')