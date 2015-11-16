class Admin::PlacesController < AdminController
	before_action :set_place, only: [:destroy,:show,:edit]

	
	def index
		@places = Place.all
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
		@place.destroy
		respond_to do |f|
			f.js
		end
	end


	private

	def set_user
		@place = Place.find(params[:id])
	end

end
