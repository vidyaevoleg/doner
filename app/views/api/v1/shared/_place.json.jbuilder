json.id place.id
json.street place.street
json.metro place.metro
json.city place.city
json.coordinates place.get_coords
json.rating place.rating
json.reviews_count place.reviews_count
json.user_id place.user_id
json.metro_line place.metro_line
json.images render partial: 'api/v1/shared/attachments', locals: {attachable: place}
json.created_at place.created_at
json.updated_at place.updated_at

