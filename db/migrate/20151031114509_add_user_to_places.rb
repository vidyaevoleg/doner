class AddUserToPlaces < ActiveRecord::Migration
  def change
    add_reference :places, :user, index: true
    add_foreign_key :places, :users
    add_reference :reviews, :user, index: true
    add_foreign_key :reviews, :users    
  end
end
