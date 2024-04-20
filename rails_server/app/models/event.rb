class Event < ApplicationRecord
  belongs_to :user

  validates :name, :event_date, presence: true
end
