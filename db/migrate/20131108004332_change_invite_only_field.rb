class ChangeInviteOnlyField < ActiveRecord::Migration
  def change
    change_column :collections, :invite_only, :boolean, default: false
  end
end
