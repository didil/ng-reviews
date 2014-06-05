# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#  name                   :string(255)
#

FactoryGirl.define do
  factory :user do
    name "Test User"
    email "test@example.com"
    password "please123"

    [:admin ].each do |role|
      factory role do
        after(:create) do |user|
          user.roles << Role.find_or_create_by(:name => role.to_s)
        end
      end
    end

  end
end
