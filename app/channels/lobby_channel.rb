class LobbyChannel < ApplicationCable::Channel

  @@LobbyPlayers = {}

  def subscribed

    lobby_id = params[:lobby_id]
    lobby = Lobby.find_by(id: lobby_id)
    # reject unless lobby.game_start

    stream_from "lobby_#{lobby_id}_#{current_user.id}"

    if @@LobbyPlayers.include? lobby_id
      @@LobbyPlayers[lobby_id] << current_user.id
    else
      @@LobbyPlayers[lobby_id] = []
      @@LobbyPlayers[lobby_id] << current_user.id
    end

    puts @@LobbyPlayers

    # player_usernames = []

    # @@LobbyPlayers[lobby_id].each do |user|

    #   user = User.find_by(id: user).username
    #   player_usernames << user

    # end

    # @@LobbyPlayers[lobby_id].each do |user|

    #   ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", player_usernames

    # end

  end

  def receive(data)
    
    lobby_id = params[:lobby_id]

    @@LobbyPlayers[lobby_id].each do |user|
      unless user == current_user.id
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", data
      end
    end


  end

  def unsubscribed

    lobby_id = params[:lobby_id]
    stop_stream_from "lobby_#{lobby_id}_#{current_user.id}"

    puts "unsub...."
    @@LobbyPlayers[lobby_id].delete(current_user.id)
    if @@LobbyPlayers[lobby_id].empty?
      @@LobbyPlayers.delete(lobby_id)
    end

    puts @@LobbyPlayers

    # unless @@LobbyPlayers[lobby_id] and @@LobbyPlayers[lobby_id].empty?

    #   player_usernames = []

    #   @@LobbyPlayers[lobby_id].each do |user|

    #     user = User.find_by(id: user).username
    #     player_usernames << user

    #   end

    #   @@LobbyPlayers[lobby_id].each do |user|

    #     ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", player_usernames

    #   end

    # end


  end

end
