class AddImageColumnToCollections < ActiveRecord::Migration
  def change
    add_column :collections, :image_url, :string
  end
end
