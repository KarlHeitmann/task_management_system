import { getGreeting } from '../support/app.po';

describe('@library-management-system-only-react/library_management_system_only_react-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains(/Welcome/);
  });
});
