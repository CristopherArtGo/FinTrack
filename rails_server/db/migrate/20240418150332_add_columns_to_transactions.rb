class AddColumnsToTransactions < ActiveRecord::Migration[7.1]
  def change
    add_column(:transactions, :description, :string)
    add_column(:transactions, :notes, :text)
  end
end
