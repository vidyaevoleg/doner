# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'topdoner'
set :repo_url, 'git@github.com:vidyaevoleg/doner.git'
set :deploy_to, '/var/www/topdoner'0
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml','config/oauth.yml')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')
set :format, :pretty
set :log_level, :info
set :assets_roles, [:web, :app]
set :normalize_asset_timestamps, %{public/images public/javascripts public/stylesheets}


namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end
  after :publishing, :restart
end

namespace :assets do
	on roles(fetch(:assets_roles)) do
	  within release_path do
	    with rails_env: fetch(:rails_env) do
	      execute :rake, 'assets:precompile'
	    end
	  end
	end
end