class AdminController < ApplicationController
	layout 'admin'
	before_action :check_ability
	include StatisticsHelper

	def index
		# @new_users_today = new_users_today
	end

	def stat
	    visits = Visit.all
	    @visits = month_data(visits)
	    @devices = device_data(visits)
	    @geo = geo_data(visits)
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
