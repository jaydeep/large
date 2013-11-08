class CreateCollectionInvitations < ActiveRecord::Migration
  def change
    create_table :collection_invitations do |t|
      t.integer :collection_id
      t.integer :user_id
      t.timestamps
    end

    add_index :collection_invitations, [:collection_id, :user_id], unique: true
  end
end
