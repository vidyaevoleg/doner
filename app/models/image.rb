class Image < ActiveRecord::Base
	belongs_to :imaginable, polymorphic: true
end
