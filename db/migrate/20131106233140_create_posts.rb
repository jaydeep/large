class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :subtitle, null: false
      t.text :body, null: false 
      t.timestamps
    end

    add_index :posts, :user_id
    add_index :posts, :title
    add_index :posts, [:user_id, :title], unique: true
  end
end
