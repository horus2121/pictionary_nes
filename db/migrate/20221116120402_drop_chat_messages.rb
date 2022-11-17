class DropChatMessages < ActiveRecord::Migration[6.1]
  def change
    drop_table :chat_messages
  end
end
