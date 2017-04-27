module ApplicationCable
  class Channel < ActionCable::Channel::Base

    def current_user
      connection.current_user
    end

    def log_in(client_data)
      connection.log_in(client_data['auth_token'])
    end

    def log_out
      connection.log_out
    end

  end
end
