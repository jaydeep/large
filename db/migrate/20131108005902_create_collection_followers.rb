class CreateCollectionFollowers < ActiveRecord::Migration
  def change
    create_table :collection_followers do |t|
      t.integer :follower_id, null: false
      t.integer :collection_id, null: false
      t.timestamps
    end

    add_index :collection_followers, [:follower_id, :collection_id], unique: true
  end
end
