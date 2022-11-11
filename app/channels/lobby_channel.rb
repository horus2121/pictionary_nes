class LobbyChannel < ApplicationCable::Channel

  @@LobbyPlayers = {}

  def subscribed

    lobby_id = params[:lobby_id]
    lobby = Lobby.find_by(lobby_id)
    puts "connected..."
    puts "connected..."
    puts "connected..."
    puts "connected..."
    puts "connected..."
    puts "connected..."
    puts "connected..."
    puts lobby
    puts lobby.in_game

    stream_from "lobby_#{lobby_id}_#{current_user.id}"

    if lobby.in_game == true

        ActionCable.server.broadcast "lobby_#{lobby_id}_#{current_user.id}", { game_status: 0}
        reject

    end

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

    # user = User.find_by(id: current_user.id)
    # user.update!(lobby_id: nil)

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

  def game_start

    lobby_id = params[:lobby_id]
    lobby = Lobby.find_by(lobby_id)
    puts "game_start..."
    puts lobby_id
    puts lobby
    lobby.update!(in_game: true)

    sequence = @@LobbyPlayers[lobby_id].shuffle

    sequence.each do |drawer|
      @@LobbyPlayers[lobby_id].each do |user|
          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", { game_status: 1, current_drawer: drawer}
      end

      sleep 10
    end

    @@LobbyPlayers[lobby_id].each do |user|
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", { game_status: 2}
    end
    # loop do
    #   t = Time.now
    #   sleep(t + 1 - Time.now)
    # end

  end

  def take_turn
  end

  def game_end
  end

end
