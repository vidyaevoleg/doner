class Admin::UsersController < AdminController
	before_action :set_user, only: [:destroy,:show,:update,:make_admin]

	def index
		@users = User.order(:created_at)
		respond_to do |f|
			f.html  
			f.json 
		end
	end
	
	def update
		@user.update(user_params)
		respond_to do |f|
			f.html { redirect_to :back}
			f.js
		end
	end

	def make_admin
		if @user.admin?
			@user.update_attributes(role: 'user')
		else
			@user.update_attributes(role: 'admin')
		end
		redirect_to :back
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

	def user_params
		params.require(:user).permit(:username,:role,:email,:uid,:image_url)
	end

	def set_user
		@user = User.find(params[:id])
	end

end
