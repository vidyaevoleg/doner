class VkPost < ActiveRecord::Base
	scope :unapproved, -> { where(approved: false) }

	def next_id
		self.class.unapproved.where("id > ?", id).try(:first).try(:id)
	end

	def previous_id
		self.class.unapproved.where("id < ?", id).try(:last).try(:id)
	end

	def author_link
		"https://vk.com/id" + vk_user_id.to_s
	end

	def date
		posted_at.strftime('%d/%m/%Y')
	end

	def approve!
		update!(approved: true)
	end
end
