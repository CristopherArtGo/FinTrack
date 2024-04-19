class ChangeAmountIntegerToDecimal < ActiveRecord::Migration[7.1]
  def change
    change_column(:accounts, :amount, :decimal, precision: 10, scale: 2)
  end
end
