class VKGrabber
	include HTTParty
	
	class << self
		URL_VK = 'http://api.vk.com/method/'
		GROUPS = [
			{domain: 'topdonersuka'},
			{domain: 'topdonerspb' },
			{domain: 'donerua'},
			{domain: 'topdoner_brn'},
			{domain: 'shaurmansk'},
			{domain: 'shayrma58'},
			{domain: 'topdonerworld'},
			{domain: 'topdonersuka_yar'},
			{domain: 'shaurmazp'},
			{domain: 'public94096426'},
			{domain: 'topdonerchel'},
			{domain: 'omskshaurma'}
		]

		
		def periodic_grab
			# собираем каждый день последние 100 записей из групп, боже какой я хитрый блять
			# метод для крона
			grab_from_groups 50
		end

		def request params
			self.get(URL_VK + params)
		end

		def params domain = 'topdonersuka', offset = 0, count = 1
			'wall.get?'+
			'v=5.44&'+
			'domain=' + domain.to_s + '&'+
			'offset='+ offset.to_s + '&'+
			'count=' + count.to_s + '&'+
			'extended=0'
		end

		# grab_from_groups(nil) - чтобы спиздить все

		def grab_from_groups count
			GROUPS.map do |gr|
				group =  gr[:domain]
				grab_from_group(group, count)
			end 
		end

		def grab_from_group group = 'topdonersuka', count
			posts_count = count || grab_posts_count(group)
			max_post_count = count || (posts_count < 100 ? posts_count : 100)
			offset = 0
			all_posts = []
			while offset < posts_count
				posts = request(params(group,offset,max_post_count)).to_hash['response']['items']
				p 'recieved-' + max_post_count.to_s
				all_posts << posts
				offset += 100
			end

			all_posts.flatten.map do |post|
				p post['id']
				save_post post
			end 

		rescue NoMethodError => exception
			p exception	   
		end

		def grab_posts_count group = 'topdonersuka'
			response = request(params(group))
			response.to_hash['response']['count']
		end

		def save_post post
			new_post = {}
			new_post[:vk_id] = post['id'].to_s.to_i
			new_post[:vk_user_id] = post['from_id'].to_s.split('')[1..-1].join().to_i
			new_post[:posted_at] = 	Time.at(post['date']).utc
			new_post[:body] = post['text']
			new_post[:approved] = false
			new_post[:attachments] = []
			if post['attachments'] 
				post['attachments'].map do |atc|
					if atc['type'] == 'photo'
						new_post[:attachments] << atc['photo']['photo_807']
					end
				end 
			end
			new_post[:attachments] = new_post[:attachments].join(',')
			VkPost.create(new_post) unless already_exist?(new_post[:vk_id])
		end

		def already_exist? vk_post_id
			VkPost.find_by(vk_id: vk_post_id)
		end
	end
end


