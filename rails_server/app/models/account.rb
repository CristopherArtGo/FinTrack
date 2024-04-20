class Account < ApplicationRecord
  belongs_to :user
  has_many :transactions, dependent: :destroy

  validates :name, :amount, presence: true
  validates :amount, numericality: true
end
