class AddAnonymToReview < ActiveRecord::Migration
  def change
    add_column :reviews, :anonym, :boolean, default: false
  end
end
