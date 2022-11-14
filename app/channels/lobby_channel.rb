class LobbyChannel < ApplicationCable::Channel

  require 'net/http'

  @@LobbyPlayers = {}

  def subscribed

    lobby_id = params[:lobby_id]
    lobby = Lobby.find_by(lobby_id)

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

  end

  def receive(data)
    
    lobby_id = params[:lobby_id]

    @@LobbyPlayers[lobby_id].each do |user|

      if data.include? "message"
        username = User.find_by(id: data["sender"]).username
        modified_data = { message: data["message"], sender: username}
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", modified_data
      elsif data.include? "scored_player" 
        username = User.find_by(id: data["scored_player"]).username
        modified_data = { scored_player: username}
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", modified_data
      elsif data.include? "canvas_path" 
        unless user == current_user.id
          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", data
        end
      else
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

  end

  def game_start

    lobby_id = params[:lobby_id]
    lobby = Lobby.find_by(lobby_id)
    lobby.update!(in_game: true)

    sequence = @@LobbyPlayers[lobby_id].shuffle

    # TODO: 
    # Update sequence if someone quits
    # Replace class variable with lobby.users

    # Clear canvas when each round ends and when drawer click bin button
    
    # Chat messages display issue

    # Deploy

    sequence.each do |drawer|

      url = "https://random-word-api.herokuapp.com/word"
      result = JSON.parse(Net::HTTP.get(URI(url)))

      @@LobbyPlayers[lobby_id].each do |user|

          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", { word: result }
          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", { game_status: 1, current_drawer: drawer}

      end

      sleep 20
    end

    @@LobbyPlayers[lobby_id].each do |user|
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user}", { game_status: 2}
    end

    lobby.update!(in_game: false)

  end

  def take_turn
  end

  def game_end
  end

end
