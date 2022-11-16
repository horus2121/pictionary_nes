class LobbyChannel < ApplicationCable::Channel

  require 'net/http'

  def subscribed

    lobby_id = params[:lobby_id]
    lobby = Lobby.find_by(lobby_id)

    stream_from "lobby_#{lobby_id}_#{current_user.id}"

    if lobby.in_game == true
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{current_user.id}", { game_status: 0}
        reject
    elsif lobby.users.length() > 6
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{current_user.id}", { game_status: 4}
        reject
    end

  end

  def receive(data)
    
    lobby_id = params[:lobby_id]
    lobby = Lobby.find_by(lobby_id)
    users = lobby.users

    users.each do |user|

      if data.include? "canvas_path" || "command" 
        unless user.id == current_user.id
          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user.id}", data
        end
      else
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user.id}", data
      end

    end

  end

  def unsubscribed

    lobby_id = params[:lobby_id]
    stop_stream_from "lobby_#{lobby_id}_#{current_user.id}"

  end

  def game_loop

    lobby_id = params[:lobby_id]
    lobby = Lobby.find_by(lobby_id)
    lobby.update!(in_game: true)
    users = lobby.users

    sequence = users.shuffle

    sequence.each do |drawer|

      url = "https://random-word-api.herokuapp.com/word"
      result = JSON.parse(Net::HTTP.get(URI(url)))[0]

      users.each do |user|

          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user.id}", { word: result }
          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user.id}", { game_status: 1, current_drawer: drawer.username}

      end

      sleep 20

      users.each do |user|

          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user.id}", { message: "The answer is {#{result}}", sender: "System" }
          ActionCable.server.broadcast "lobby_#{lobby_id}_#{user.id}", { command: 1 }

      end

    end

    users.each do |user|
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user.id}", { game_status: 2}
    end

    users.each do |user|
        ActionCable.server.broadcast "lobby_#{lobby_id}_#{user.id}", { game_status: 3}
    end

    lobby.update!(in_game: false)

  end

end
