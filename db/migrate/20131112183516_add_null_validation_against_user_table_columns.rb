class AddNullValidationAgainstUserTableColumns < ActiveRecord::Migration
  def change
    change_column :users, :twitter_handle, :string, null: false
    change_column :users, :twitter_url, :string, null: false
    change_column :users, :profile_image, :string, null: false
  end
end
