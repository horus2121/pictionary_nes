class LobbiesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

    def index
        lobbies = Lobby.all
        
        render json: { lobbies: lobbies }, status: :created
    end

    def show
        lobby = Lobby.find(params[:id])

        render json: { lobby: lobby }, status: :created
    end

    def create
        lobby = Lobby.create!(lobby_params)

        if lobby
            render json: { lobby: lobby }, status: :created
        else
            render json: { errors: lobby.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def destroy
        lobby = Lobby.find(params[:id])
        lobby.destroy

        render json: { success: "Lobby destroyed."}, status: :see_other
    end

    private

    def lobby_params
        params.require(:lobby).permit(:title, :description, :mode, :link_code, :password)
    end

    def render_record_not_found
        render json: { status: "Record Not Found." }
    end

    def render_record_invalid
        render json: { status: "Record Invalid." }
    end

end
