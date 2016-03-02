class AdminController < ApplicationController
	layout 'admin'
	before_action :check_ability
	include StatisticsHelper

	def index

	end

	def stat

	end
	
	def upload
	
	end

	def vkposts
		
	end

	private

	def check_ability
		unless current_user && current_user.role == 'admin'
			redirect_to root_path
		end
	end
end
