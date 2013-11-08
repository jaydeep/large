class AddCollectionIdToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :collection_id, :integer
  end
end
