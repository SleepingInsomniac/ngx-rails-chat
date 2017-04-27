module ApplicationCable
  class Connection < ActionCable::Connection::Base

    def connect
    end

    def id
      @connection_id ||= SecureRandom.hex(10)
    end

    def logged_in?
      not current_user.new?
    end

    def log_in(auth_token)
      @current_user = find_verified_user(auth_token)
    end

    def log_out
      @current_user = nil
    end

    def current_user
      return @current_user if @current_user
      @guest_user ||= User.new(username: "anon")
    end

    private

    def find_verified_user(auth_token)
      if @auth_params = JsonWebToken.decode(auth_token)
        if Time.now > Time.at(@auth_params[:exp])
          nil # Token has expired
        else
          User.find(@auth_params['user_id'])
        end
      else
        nil # Token is invalid
      end
    end

  end
end
