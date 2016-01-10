class MakeRatingEqual1ByDefault < ActiveRecord::Migration

	def up
	  change_column :places, :rating, :string, default: 1
	end

	def down
	  change_column :places, :rating, :string, default: nil
	end

end
