class CreateAdminService
  def call
    user = User.find_or_create_by!(email: Rails.application.secrets.admin_email) do |user|
      user.password = Rails.application.secrets.admin_password
      user.password_confirmation = Rails.application.secrets.admin_password
    end

    user.roles << Role.find_or_create_by(:name => "admin") unless user.has_role? :admin

    user
  end
end
