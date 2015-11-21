class Admin::PlacesController < AdminController
	before_action :set_place, only: [:destroy,:show,:edit,:reviews]

	def index
		@places = Place.all
		respond_to do |f|
			f.html  
			f.json 
		end
	end

	def reviews
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

	def delete_review
		@review = Review.find(params[:place_id])
		@review.destroy
		respond_to do |f|
			f.html { redirect_to :back }
			f.js
		end
	end

	private

	def set_place
		@place = Place.find(params[:id])
	end

end
