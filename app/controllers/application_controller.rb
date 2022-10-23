class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    # before_action :logged_in?

    private

    def logged_in?
        unless session.include? :current_user_id
            render json: { error: "Please log in."}, status: :unauthorized 
        end
    end

end
