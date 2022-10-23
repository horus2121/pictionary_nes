class LobbyChannel < ApplicationCable::Channel
  def subscribed
    stream_from "lobby_#{params[:lobby_id]}"
  end

  def receive(data)
    puts data
    ActionCable.server.broadcast "lobby_#{params[:lobby_id]}", data
  end

  def unsubscribed
    stop_all_streams
  end
end
