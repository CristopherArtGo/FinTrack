FactoryBot.define do
  factory :user do
    first_name { "MyString" }
    last_name { "MyString" }
    email_address { "MyString" }
    encrypted_password { "MyString" }
    salt { "MyString" }
  end
end
