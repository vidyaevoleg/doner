class AdminController < ApplicationController
	layout 'admin'
	before_action :check_ability
	def index
		
	end

	private

	def check_ability
		if current_user && current_user.role == 'admin'
			true
		else
			redirect_to root_path
		end
	end
end
