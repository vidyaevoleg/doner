class Api::V1::UsersController < ApplicationController
	
	respond_to :json

	def login
		registrated_user = User.registrated? user_params
		if registrated_user
			@user = registrated_user 
		else
			@user = User.create_from_params user_params
		end
		sign_in @user, :event => :authentication
		render json: {user: @user}
	end

	def destroy

	end
	
	def user_params
		params.require(:user).permit(:uid, :provider, :username, :image_url)
	end
end
