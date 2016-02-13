json.users do 
	json.array! @users do |user|
		json.user render partial: 'api/v1/shared/user', locals: {user: user}
	end
end