class LobbiesController < ApplicationController
    # rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    # rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

    def index
        lobbies = Lobby.all
        
        render json: { lobbies: lobbies }, status: :created
    end

    def show
        lobby = Lobby.find(params[:id])

        render json: { lobby: lobby }, status: :created
    end

    def create
        puts "lobby params..."
        puts lobby_params
        lobby = Lobby.create!(lobby_params.merge(user_id: session[:current_user_id]))

        # user = User.find_by(id: session[:current_user_id])
        # user.update(lobby_id: lobby.id)

        if lobby
            render json: { lobby: lobby }, status: :created
        else
            render json: { error: "Unprocessable lobby..." }, status: :unprocessable_entity
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
