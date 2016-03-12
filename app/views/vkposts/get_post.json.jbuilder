json.current_post render partial: 'post', locals: {post: @post}
json.next_id @next_post_id
json.prev_id @prev_post_id