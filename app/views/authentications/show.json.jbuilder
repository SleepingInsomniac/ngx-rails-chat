json.auth_token @auth_token
json.expires_at @expires_at
json.user do
  json.partial! "users/user", user: @user
end