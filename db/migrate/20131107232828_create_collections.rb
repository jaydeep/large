class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :owner_id, null: false
      t.boolean :invite_only, null: false
      t.timestamps
    end

    add_index :collections, :name, unique: true
    add_index :collections, :owner_id
  end
end
