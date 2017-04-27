# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

unless User.find_by username: 'admin'
  password = SecureRandom.hex(16)
  if admin = User.create(username: 'admin', password: password)
    puts "user: admin, password: #{password}"
    File.open('admin_password', 'w') {|f| f.write(password) }
  else
    puts "Could not create admin user"
  end
end

unless Room.find_by name: 'lobby'
  if lobby = Room.create(name: 'lobby')
    puts "Lobby created"
  else
    puts "Could not create lobby"
  end
end
