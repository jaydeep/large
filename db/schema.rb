# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131112183516) do

  create_table "collection_followers", :force => true do |t|
    t.integer  "follower_id",   :null => false
    t.integer  "collection_id", :null => false
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "collection_followers", ["follower_id", "collection_id"], :name => "index_collection_followers_on_follower_id_and_collection_id", :unique => true

  create_table "collection_invitations", :force => true do |t|
    t.integer  "collection_id"
    t.integer  "user_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "collection_invitations", ["collection_id", "user_id"], :name => "index_collection_invitations_on_collection_id_and_user_id", :unique => true

  create_table "collections", :force => true do |t|
    t.string   "name",                           :null => false
    t.text     "description",                    :null => false
    t.integer  "owner_id",                       :null => false
    t.boolean  "invite_only", :default => false, :null => false
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  add_index "collections", ["name"], :name => "index_collections_on_name", :unique => true
  add_index "collections", ["owner_id"], :name => "index_collections_on_owner_id"

  create_table "posts", :force => true do |t|
    t.integer  "user_id",       :null => false
    t.string   "title",         :null => false
    t.string   "subtitle",      :null => false
    t.text     "body",          :null => false
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "collection_id"
  end

  add_index "posts", ["title"], :name => "index_posts_on_title"
  add_index "posts", ["user_id", "title"], :name => "index_posts_on_user_id_and_title", :unique => true
  add_index "posts", ["user_id"], :name => "index_posts_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "provider",         :null => false
    t.string   "uid",              :null => false
    t.string   "name",             :null => false
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.text     "description"
    t.string   "location"
    t.string   "twitter_handle",   :null => false
    t.string   "twitter_url",      :null => false
    t.string   "profile_image",    :null => false
    t.string   "background_image"
  end

  add_index "users", ["name"], :name => "index_users_on_name"
  add_index "users", ["twitter_handle"], :name => "index_users_on_twitter_handle", :unique => true
  add_index "users", ["uid"], :name => "index_users_on_uid"

end
