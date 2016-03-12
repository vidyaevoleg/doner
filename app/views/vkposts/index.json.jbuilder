json.array! @posts do |post|
	json.post render partial: 'post', locals: {post: post}
end
