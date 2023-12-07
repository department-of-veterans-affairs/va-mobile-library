# VA Design System Mobile ESLint Configuration

This package contains an ESLint config for use by consumers of the [VA Design System Mobile Component Library](https://www.npmjs.com/package/@department-of-veterans-affairs/mobile-component-library) to automatically issue deprecation notices when outdated components are being used.

## Getting Started
These steps assume you already have `eslint` installed for your project as a devDependency and configured correctly.
1. Add `eslint-plugin-deprecate` as a devDependency to your project (peerDependency of package)
2. Add `@department-of-veterans-affairs/eslint-config-mobile` as a devDependency to your project
3. In your eslint config file, add to the `extends` attribute: `@department-of-veterans-affairs/mobile`