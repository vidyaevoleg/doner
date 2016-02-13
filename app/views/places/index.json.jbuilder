json.array! @places do |place|
	json.place place.to_nice_json
	json.reviews place.reviews.map {|review| review.to_nice_json}
end