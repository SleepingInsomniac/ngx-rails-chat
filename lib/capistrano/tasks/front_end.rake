namespace :deploy do
  namespace :frontend do
    task :build do
      user = fetch(:user)
      on roles(:app) do |host|
        system "yarn"
        system "yarn run build"
      end
    end

    task :upload, %i[build] do
      user = fetch(:user)
      on roles(:app) do |host|
        execute "mkdir -p #{release_path}/public/angular"
        execute "rsync -azvh public/angular/ #{release_path}/public/angular"
      end
    end
    before 'deploy:frontend:upload', 'deploy:frontend:build'

    task :all
    before 'deploy:frontend:all', 'deploy:frontend:upload'
  end
end

after 'deploy:updated', 'deploy:frontend:all'
