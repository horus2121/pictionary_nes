class ChatMessagesController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

    def create
        user = User.find_by(id: session[:current_user_id])

        if user

            chat_message = ChatMessage.create!(chat_message_params.merge(user_id: user.id, lobby_id: user.lobby.id))

            if chat_message
                render json: { chat_message: chat_message}, status: :created
            else
                render json: { errors: "Unable to create chat message..."}, status: :unprocessable_entity
            end

        end

        ActionCable.server.broadcast "lobby_#{user.lobby.id}_#{user.id}", message: chat_message.content
    end

    private
    
    def chat_message_params
        params
        .require(:chat_message)
        .permit(:content, :user_id, :lobby_id)
    end

    def render_record_not_found
        render json: { status: "Record Not Found." }
    end

    def render_record_invalid
        render json: { status: "Record Invalid." }
    end
end
