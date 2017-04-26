namespace :nginx do
  task :link do
    on roles(:app) do |host|
      # execute "rm /etc/nginx/sites-enabled/#{}"
      execute "ln -f -s #{release_path}/config/nginx.conf /etc/nginx/sites-enabled/#{fetch :application}.conf"
    end
  end
end

after 'deploy:updated', 'nginx:link'
