task :capture_env_variables do
  on roles :db do
    text = capture "cat #{shared_path}/.env"
    VARS = Dotenv::Parser.call(text)
    set :default_env, VARS
  end
end
