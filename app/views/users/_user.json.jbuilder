json.extract! user, :id, :username, :email, :last_login, :color, :created_at, :updated_at
json.url user_url(user, format: :json)
