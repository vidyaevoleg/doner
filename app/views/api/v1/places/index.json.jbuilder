json.array! @places do |place|
	json.place render partial: 'api/v1/shared/place', locals: {place: place}
	if place.reviews.any?  
		json.reviews do
			json.array! place.reviews do |review|
				json.review render partial: 'api/v1/shared/review', locals: {review: review}
			end
		end
	end
end