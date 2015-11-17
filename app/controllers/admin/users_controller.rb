class Admin::UsersController < AdminController
	before_action :set_user, only: [:destroy,:show]

	def index
		@users = User.all
		respond_to do |f|
			f.html  
			f.json 
		end
	end

	def show
		respond_to do |f|
			f.html 
			f.json 
		end
	end

	def destroy
		@user.destroy
		respond_to do |f|
			f.js
		end
	end


	private

	def set_user
		@user = User.find(params[:id])
	end

end
