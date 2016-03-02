class Image < ActiveRecord::Base
	belongs_to :imaginable, polymorphic: true
	mount_uploader :file, UploadUploader
	# after_save :resize_original

 	def resize_original
	    file = MiniMagick::Image.new(self.file.path)
	    file.resize "800x800"
  	end
end
