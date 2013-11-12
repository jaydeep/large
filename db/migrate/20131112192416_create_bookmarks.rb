class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.integer :post_id
      t.integer :user_id
      t.timestamps
    end

    add_index :bookmarks, :post_id
    add_index :bookmarks, :user_id
    add_index :bookmarks, [:post_id, :user_id], unique: true
  end
end