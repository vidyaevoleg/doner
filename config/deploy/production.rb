server '178.62.199.124', user: 'oleg', roles: %w{app db web}
set :unicorn_rack_env, -> { "production" }