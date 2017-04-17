module ApplicationCable
  class Connection < ActionCable::Connection::Base

    attr_accessor :current_user

    def connect
      if request.params
        puts request.params
        find_verified_user request.params['auth_token']
      else
        reject_unauthorized_connection
      end
    end

    private
    
    def find_verified_user(auth_token)
      if @auth_params = JsonWebToken.decode(auth_token)
        if Time.now > Time.at(@auth_params[:exp])
          reject_unauthorized_connection
        else
          @current_user = User.find(@auth_params['user_id'])
        end
      else
        reject_unauthorized_connection
      end
    end

  end
end
