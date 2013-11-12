class CreateRecommendations < ActiveRecord::Migration
  def change
    create_table :recommendations do |t|
      t.integer :post_id
      t.integer :user_id
      t.timestamps
    end

    add_index :recommendations, :post_id
    add_index :recommendations, :user_id
    add_index :recommendations, [:post_id, :user_id], unique: true
  end
end
