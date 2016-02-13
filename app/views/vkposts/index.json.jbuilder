json.array! @posts do |post|
	json.post post.id
	json.vk_post_id post.vk_id
	json.vk_user_id post.vk_user_id
	json.body post.body
	json.posted_at post.posted_at
	json.attachments do  
		json.array! post.attachments.split(',') do |attach_url|
			json.url attach_url
		end
	end
end
