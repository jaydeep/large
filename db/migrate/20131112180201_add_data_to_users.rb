class AddDataToUsers < ActiveRecord::Migration
  def change
    add_column :users, :description, :text
    add_column :users, :location, :string
    add_column :users, :twitter_handle, :string
    add_column :users, :twitter_url, :string
    add_column :users, :profile_image, :string
    add_column :users, :background_image, :string

    add_index :users, :twitter_handle, unique: true
  end
end
