# == Schema Information
#
# Table name: rooms
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_rooms_on_name  (name)
#

class Room < ApplicationRecord
  validates :name, presence: true, uniqueness: true
end
