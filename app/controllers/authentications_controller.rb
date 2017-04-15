class AuthenticationsController < ApplicationController
  wrap_parameters :authentication, include: [:email, :password], format: [:json, :xml, :url_encoded_form, :multipart_form]

  def create
    if request_params[:username] =~ /\@/
      @user = User.find_by(email: request_params[:username])
    else
      @user = User.find_by(username: request_params[:username])
    end
    if @user && @user.authenticate(request_params[:password])
      @user.update(last_login: Time.now)
      @expires_at = 12.hours.from_now
      @auth_token = JsonWebToken.encode({user_id: @user.id}, @expires_at)
      ChatChannel.broadcast_to('chat_channel', message: 'hello')
      render 'show.json', status: 201
    else
      render json: {status: 'Unauthorized'}, status: 401
    end
  end

  def destroy
    # The token is good until it expires... it's just deleted on the front end
    # Maybe stream the action to actioncable to let people know they logged out?
  end

  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def request_params
    params.require(:authentication).permit(:username, :password)
  end
end
