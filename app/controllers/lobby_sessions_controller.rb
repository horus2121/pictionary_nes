class LobbySessionsController < ApplicationController

    def create
        lobby = Lobby.find_by(id: params[:lobby_id])

        if lobby

            serialized_lobby = LobbySerializer.new(lobby)
            user = User.find_by(id: session[:current_user_id])

            user.update!(lobby_id: lobby.id)
            puts "user list..."
            lobby.users.each do |user|
                puts user.username
            end

            render json: {
                lobby: serialized_lobby
            },
            status: :created
        else
            render json: { error: "Cannot join the lobby..." }, status: :unprocessable_entity
        end

    end

    def destroy

        lobby = Lobby.find_by(id: params[:lobby_id])
        user = User.find_by(id: session[:current_user_id])

        if lobby
            user.update!(lobby_id: nil)

            if lobby.users.empty?
                lobby.destroy
            end
        end

        render json: { success: "Lobby session deleted."}
    end

    # def self.game_start(players)

    #     players.each do |player|
    #         ActionCable.server.broadcast "lobby_#{lobby_id}_#{player}", {action: "game_start", msg: "?"}
    #     end

    # end

    # def self.take_turn
    # end

    # def self.game_end
    # end

end
