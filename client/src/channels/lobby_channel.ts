import consumer from './consumer'

export const lobbyChannel = consumer.subscriptions.create({ channel: 'LobbyChannel', lobby_id: 10 },
    {
        connected() {
            console.log('Connected to room channel...')
        },

        disconnected() {

        },

        received(data) {
            console.log(data)
        },

    }
)