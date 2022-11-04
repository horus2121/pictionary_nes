class UsersController < ApplicationController
    skip_before_action :logged_in?, only: [:create]

    # rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    # rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

    def create
        
        if user_params.include? :authority
            user = User.create!(user_params)
        else
            puts "user params..."
            puts user_params
            user = User.create!(user_params.merge(authority: 'regular'))
        end


        if user

            render json: { 
                    user: user, 
                    success: "Successfully signed up..."
                    }, 
                    status: :created
        else
            render json: { error: "Unprocessable user..." }, status: :unprocessable_entity
        end

    end

    def show
        user = User.find_by(id: session[:current_user_id])
        serialized_user = UserSerializer.new(user)

        render json: { user: serialized_user }, status: :created
    end

    private

    def user_params
        params
        .require(:user)
        .permit(:username, :password, :password_confirmation)
    end

    def render_record_not_found
        render json: { error: "Record Not Found." }
    end

    def render_record_invalid
        render json: { error: "Record Invalid." }
    end
end
