# == Schema Information
#
# Table name: users
#
#  id                   :integer          not null, primary key
#  username             :string
#  email                :string
#  last_login           :datetime
#  password_digest      :string
#  password_reset_token :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  color                :string
#
# Indexes
#
#  index_users_on_email     (email)
#  index_users_on_username  (username)
#

class User < ApplicationRecord
  has_secure_password
  has_secure_token :password_reset_token
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }, allow_nil: true

  after_initialize :ensure_color

  def ensure_color
    color_rgb rand(0..255), rand(0..255), rand(0..255) if color.nil?
  end

  def color_rgb(*colors)
    self.color = colors.join(',')
  end

  def color_hex(string)
    string = string[/[\da-f]+/i]
    if string.length == 3
      colors = string.split('').map{ |c| "#{c}#{c}".to_i(16) }
    else
      colors = string.chars.each_slice(2).map{|c| c.join.to_i(16) }
    end
    self.color = colors.join(',')
  end

end
