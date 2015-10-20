class ImagesController < ApplicationController
	before_action :set_imaginable, only: :create
	def create
		@image = @imaginable.images.build(image_params)
		if @image.save
			render json: @image
		else
			render json: {},status: 500
		end
	end

	def destroy
	end
	
	private

	def image_params
		params.require(:image).permit(:file)
	end
	
	def set_imaginable
		type = params[:imaginable_type].classify.constatize
		id = params[:imaginable_id]
		@imaginable = type.find(id)
	end
end
