class Image < ActiveRecord::Base
	belongs_to :imaginable, polymorphic: true
	mount_uploader :file, UploadUploader
end
