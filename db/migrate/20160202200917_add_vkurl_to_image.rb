class AddVkurlToImage < ActiveRecord::Migration
  def change
  	add_column :images, :vk_url, :string
  end
end
