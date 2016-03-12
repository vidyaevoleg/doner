json.post_id post.id
json.vk_post_id post.vk_id
json.author_link post.author_link
json.body post.body
json.date post.date
json.attachments do  
	json.array! post.attachments.split(',') do |attach_url|
		json.url attach_url
	end
end