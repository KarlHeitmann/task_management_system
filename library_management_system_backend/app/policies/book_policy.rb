class BookPolicy < ApplicationPolicy
  def create?
    user.is_a?(Librarian)
  end

  def update?
    user.is_a?(Librarian)
  end

  def destroy?
    user.is_a?(Librarian)
  end

  def show?
    true
  end
end