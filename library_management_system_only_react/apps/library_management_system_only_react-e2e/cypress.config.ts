import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default:
          'npx nx run @library-management-system-only-react/library_management_system_only_react:dev',
        production:
          'npx nx run @library-management-system-only-react/library_management_system_only_react:dev',
      },
      ciWebServerCommand:
        'npx nx run @library-management-system-only-react/library_management_system_only_react:dev',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
