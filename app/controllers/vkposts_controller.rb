class VkpostsController < ApplicationController
	respond_to :html, :json

	def update
	
	end

	def index
		@posts = VkPost.unapproved
		respond_with :json
	end

	def destroy
	
	end

end