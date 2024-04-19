class CreateBudgets < ActiveRecord::Migration[7.1]
  def change
    create_table :budgets do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :category_1, precision: 10, scale: 2, :null => false, :default => 0
      t.decimal :category_2, precision: 10, scale: 2, :null => false, :default => 0
      t.decimal :category_3, precision: 10, scale: 2, :null => false, :default => 0
      t.decimal :category_4, precision: 10, scale: 2, :null => false, :default => 0
      t.decimal :category_5, precision: 10, scale: 2, :null => false, :default => 0
      t.decimal :category_6, precision: 10, scale: 2, :null => false, :default => 0
      t.decimal :category_7, precision: 10, scale: 2, :null => false, :default => 0
      t.decimal :category_8, precision: 10, scale: 2, :null => false, :default => 0
      t.decimal :category_9, precision: 10, scale: 2, :null => false, :default => 0

      t.timestamps
    end
  end
end
