namespace :deploy do
  namespace :frontend do
    task :build do
      user = fetch(:user)
      on roles(:app) do |host|
        system "cd app/angular && yarn"
        system "cd app/angular && yarn run build"
      end
    end

    task :upload, %i[build] do
      user = fetch(:user)
      on roles(:app) do |host|
        execute "mkdir -p #{release_path}/public"
        Dir.glob('public/**/*').each do |file|
          upload! file, "#{release_path}/public/#{File.basename file}"
        end
      end
    end
    before 'deploy:frontend:upload', 'deploy:frontend:build'

    task :all
    before 'deploy:frontend:all', 'deploy:frontend:upload'
  end
end

after 'deploy:updated', 'deploy:frontend:all'
