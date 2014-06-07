class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    # Common abilities
    can :read, Product

    # Admin
    if user.has_role? :admin
      can :manage, :all
    end

  end
end
