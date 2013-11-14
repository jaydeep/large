class AddDraftStatusToPost < ActiveRecord::Migration
  def change
    add_column :posts, :publish_status, :boolean, default: false
  end
end
