json.id review.id
json.vegetables review.vegetables
json.meat review.meat
json.service review.service
json.sanitation review.sanitation
json.rating review.rating
json.min_price review.min_price
json.max_price review.max_price
json.body review.body.html_safe
json.body_nl review.to_format
json.title review.title
json.total review.total
json.anonym review.anonym
json.date review.updated_at

json.author do 
  json.partial! partial: 'users/user.json', locals: {user: review.user}
end

images = review.images

if images.any?
  json.images images.map {|i| {url: i.valid_url, id: i.id}}
end
