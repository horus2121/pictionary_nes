class SessionsController < ApplicationController
    skip_before_action :logged_in?, only: [:create]

    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found

    def create
        user = User.find_by(username: params[:username])

        if user&.authenticate(params[:password])

            if session[:current_user_id] == user.id

                render json: { 
                        logged_in: true,
                        user: UserSerializer.new(user),
                        error: "Already logged in..."
                        } 
            else
                session[:current_user_id] = user.id

                render json: { 
                    logged_in: true, 
                    user: UserSerializer.new(user),
                    success: "Successfully logged in..."
                }, 
                    status: :created
            end

        else
            render json: { error: "Unprocessable user..." }, status: :unprocessable_entity
        end

    end

    def destroy

        session.delete :current_user_id

        render json: { success: "Session deleted."}
    end

    private

    def session_params
        params
        .require(:user)
        .permit(:username, :password)
    end

    def render_record_not_found
        render json: { status: "Record Not Found." }
    end
end
