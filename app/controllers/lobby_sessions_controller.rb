class LobbySessionsController < ApplicationController

    def create
        lobby = Lobby.find_by(id: params[:lobby_id])

        if lobby

            user = User.find_by(id: session[:current_user_id])

            user.update!(lobby_id: lobby.id)
            puts "user list..."
            lobby.users.each do |user|
                puts user.username
            end

            render json: {
                lobby: lobby
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
        end

        if lobby.users.empty?
            lobby.destroy
        end

        render json: { success: "Lobby session deleted."}
    end

end
