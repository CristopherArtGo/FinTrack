FactoryBot.define do
  factory :transaction do
    account { nil }
    category { 1 }
    is_expense { false }
    amount { "9.99" }
  end
end
