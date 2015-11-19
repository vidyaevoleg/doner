class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.string :body
      t.string :feedback_type

      t.timestamps null: false
    end
    add_reference :feedbacks, :user, index: true
    add_foreign_key :feedbacks, :users
  end
end
