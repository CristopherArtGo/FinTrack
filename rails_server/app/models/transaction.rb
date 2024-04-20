class Transaction < ApplicationRecord
  belongs_to :account

  validates :description, :amount, :is_expense, :category, presence: true
end
