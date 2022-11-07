class LobbyChannel < ApplicationCable::Channel

  @@LobbyPlayers = {}

  def subscribed

    lobby_id = params[:lobby_id]
    stream_from "lobby_#{lobby_id}_#{current_user.id}"

    if @@LobbyPlayers.include? lobby_id
      @@LobbyPlayers[lobby_id] << current_user.id
    else
      @@LobbyPlayers[lobby_id] = []
      @@LobbyPlayers[lobby_id] << current_user.id
    end

    puts @@LobbyPlayers

  end

  def receive(data)
    
    lobby_id = params[:lobby_id]

    @@LobbyPlayers[lobby_id].each do |user|
      puts user
      unless user == current_user.id
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", data
      end
    end


  end

  def unsubscribed

    lobby_id = params[:lobby_id]
    stop_stream_from "lobby_#{lobby_id}_#{current_user.id}"

    @@LobbyPlayers[lobby_id].delete(current_user.id)
    if @@LobbyPlayers[lobby_id].empty?
      @@LobbyPlayers.delete(lobby_id)
    end

    puts @@LobbyPlayers

  end

end
