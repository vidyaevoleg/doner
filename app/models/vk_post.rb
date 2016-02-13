class VkPost < ActiveRecord::Base
	scope :unapproved, -> { where(approved: false) }

end
