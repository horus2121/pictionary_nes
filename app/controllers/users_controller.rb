class UsersController < ApplicationController
    skip_before_action :logged_in?, only: [:create]

    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

    def create
        if user_params.include? :type
            user = User.create!(user_params)
        else
            user = User.create!(user_params.merge(authority: 'regular'))
        end

        if user
            session[:current_user_id] = user.id

            render json: { user: user }, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def show
        user = User.find_by(id: session[:current_user_id])

        render json: { user: user }, status: :created
    end

    private

    def user_params
        params
        .require(:user)
        .permit(:username, :authority, :password, :password_confirmation)
    end

    def render_record_not_found
        render json: { status: "Record Not Found." }
    end

    def render_record_invalid
        render json: { status: "Record Invalid." }
    end
end
