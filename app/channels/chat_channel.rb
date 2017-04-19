class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from current_room
    ActionCable.server.broadcast current_room, { text: "#{current_user.username} has entered the room", user: server_user }
  end

  def unsubscribed
    ActionCable.server.broadcast current_room, { text: "#{current_user.username} has left the room", user: server_user }
  end

  def send_message(client_data)
    ActionCable.server.broadcast(current_room, {
      text: client_data['text'],
      server_timestamp: Time.now,
      user: { id: current_user.id, username: current_user.username, color: current_user.color }
    })
  end

  private

  def current_room
    "chat_#{params[:room]}"
  end

  def server_user
    { username: 'Server', color: '200,200,200' }
  end

end
