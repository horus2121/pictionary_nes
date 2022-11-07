import consumer from './consumer'

export const lobbyChannel = (channelProps: any) => {
    return consumer.subscriptions.create(channelProps.lobbyParams, channelProps.handlers)
}