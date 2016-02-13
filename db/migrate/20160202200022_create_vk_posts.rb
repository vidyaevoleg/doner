class CreateVkPosts < ActiveRecord::Migration
  def change
    create_table :vk_posts do |t|
      t.integer :vk_id
      t.integer :vk_user_id
      t.text :body
      t.string :attachments
      t.boolean :approved
      t.datetime :posted_at
      t.timestamps null: false
    end
  end
end
