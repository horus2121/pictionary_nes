class LobbySessionsController < ApplicationController

    def create
        lobby = Lobby.find_by(id: params[:lobby_id])

        if lobby
            session[:current_lobby_id] = lobby.id

            user = User.find_by(id: session[:current_user_id])
            user.update(lobby_id: lobby.id)

            render json: {
                lobby: lobby
            },
            status: :created
        else
            render json: { errors: lobby.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def destory
        session.delete :current_lobby_id

        user = User.find_by(id: session[:current_user_id])
        user.update(lobby_id: nil)

        render json: { success: "Lobby session deleted."}
    end

end
