user = place.user

json.properties do 
  json.id place.id
  json.rating (place.rating || 1)
  json.city place.city
  json.street place.street
  json.metro place.metro
  json.metro_line place.metro_line
  
  json.author do 
    json.partial! partial: 'users/user.json', locals: {user: user}
  end
  
  json.reviews_count place.reviews_count

  if place.images.any?
    json.image = {url: place.images.last.valid_url}
  end

end

json.geometry do
  json.coordinates place.get_coords
  json.type 'Point'
end
