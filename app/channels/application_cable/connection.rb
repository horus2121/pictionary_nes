module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    rescue_from StandardError, with: :handle_error

    def Connection
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      if verified_user = User.find_by(id: session[:current_user_id])
        verified_user
      else
        reject_unauathorized_connnection
      end
    end

    def handle_error
      render json: { error: 'Something went wrong with connection.'}
    end

  end
end
