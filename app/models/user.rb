class User < ApplicationRecord
  has_secure_password
  has_secure_token :password_reset_token
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  before_create :ensure_color

  def ensure_color
    unless self.color
      self.color = "#{rand 0..255},#{rand 0..255},#{rand 0..255}"
    end
  end

end
