json.id review.id
json.title review.title
json.body review.body
json.sanitation review.sanitation
json.meat review.meat
json.vegetables review.vegetables
json.service review.service
json.rating review.total
json.anonym review.anonym
json.place_id review.place_id
json.author review.user_id
json.images render partial: 'api/v1/shared/attachments', locals: {attachable: review}
json.created_at review.created_at
json.updated_at review.updated_at