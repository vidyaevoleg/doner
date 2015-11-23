class AddContactsToFeedback < ActiveRecord::Migration
  def change
  	add_column :feedbacks, :contacts, :string
  end
end
