class AddFirstNameToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :username, :string
  	add_column :users, :uid, :string
  	add_column :users, :provider, :string
  	add_column :users, :image_url,:string  	
  end
end
