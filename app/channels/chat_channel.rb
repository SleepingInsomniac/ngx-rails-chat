class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from current_room
    ActionCable.server.broadcast current_room, data: {message: "Welcome #{current_user.username}"}
  end

  def unsubscribed
    ActionCable.server.broadcast current_room, data: {message: "#{current_user.username} has left"}
  end

  def send_message(client_data)
    puts client_data
    ActionCable.server.broadcast(current_room, data: {
      message: client_data['message'],
      username: current_user.username
    })
  end

  def current_room
    "chat_#{params[:room]}"
  end

end
