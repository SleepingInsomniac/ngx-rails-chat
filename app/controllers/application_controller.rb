class ApplicationController < ActionController::API

  private

  def auth_params
    return @auth_params if @auth_params
    if request.headers['Authorization'].present?
      auth_token = request.headers['Authorization'].split(' ').last
    else
      # errors.add "Authorization required"
      return nil
    end

    unless @auth_params = JsonWebToken.decode(auth_token)
      # errors.add "Not logged in"
      return nil
    end

    if Time.now > Time.at(@auth_params[:exp])
      # errors.add "Session Expired"
      return nil
    end
    @auth_params
  end

  def current_user
    @current_user ||= User.find(auth_params[:user_id])
  end

  def authenticate_request
    render json: { error: 'Not Authorized' }, status: 401 and return unless auth_params
  end

end
