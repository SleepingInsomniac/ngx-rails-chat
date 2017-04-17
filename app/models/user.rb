class User < ApplicationRecord
  has_secure_password
  has_secure_token :password_reset_token
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
