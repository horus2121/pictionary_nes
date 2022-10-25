class SessionsController < ApplicationController
    skip_before_action :logged_in?, only: [:create]

    def create
        user = User.find_by(username: params[:username])

        if user&.authenticate(params[:password])
            session[:current_user_id] = user.id

            render json: { 
                logged_in: true, 
                user: user,
            }, 
                status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def destroy
        session.delete :current_user_id

        render json: { success: "Session deleted."}
    end

    private

    def session_params
        params.require(:user).permit(:username, :password)
    end

end
