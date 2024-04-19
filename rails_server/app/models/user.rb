class User < ApplicationRecord
    attr_accessor :password

    has_many :accounts, dependent: :destroy
    has_many :events, dependent: :destroy
    has_one :budget

    validates :first_name, :last_name, :email_address, :password, :password_confirmation, presence: true
    validates :password, confirmation: true, length: { minimum: 8 }
    validates :email_address, uniqueness: true

    before_save :encrypt_password

    private
    def encrypt_password
        self.salt = Digest::SHA2.hexdigest("#{Time.now.utc}--#{password}}")
        self.encrypted_password = encrypt(password)
    end

    def encrypt(password)
        Digest::SHA2.hexdigest("#{self.salt}--#{password}")
    end

end
