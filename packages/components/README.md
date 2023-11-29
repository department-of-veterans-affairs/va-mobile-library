# VA Design System Mobile Component Library

## Getting Started

### Prerequisites

1. Install [Node.js](https://nodejs.org/en)
2. Install [NVM](https://github.com/nvm-sh/nvm)
3. Install [yarn 3.6.1](https://yarnpkg.com/getting-started/install)

### Installation

1. Clone the repo

```
git clone git@github.com:department-of-veterans-affairs/va-mobile-library.git
```

2. From the root directory (`va-mobile-library`) run `nvm use`. If you do not have the active Node version installed (you will see an error) run `nvm install v18.18.0` (replacing v.18.18.0 with the version listed in our root-level .nvmrc file), then run `nvm use` to activate it.

3. Install dependencies

```
yarn
```
then
```
yarn workspace @department-of-veterans-affairs/mobile-tokens tokens:build
```

5. Launch the app

- **Physical Device**
  1. Install the Expo Go app from the [App Store](https://itunes.apple.com/app/apple-store/id982107779) or [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)
  2. Navigate to the components package
```
cd va-mobile-library/packages/components
```
  3. Run `yarn start`
  4. Using your devices camera, scan the QR code that pops up in your console
- **Simulator**
  1. Run `yarn start`
  2. Press `i` to run on an iOS simulator or `a` to run on an Android Emulator (you may have to set up an emulator in Android Studio in order for this to work)
- **Web Browser**
  1. Run `yarn storybook:web`

### Yarn Commands

| Command              | Description |
| -------------------- | ----------- |
| `start`              | Starts Metro Bundler with options to run app on different platforms. **Note:** To run on web, use `yarn storybook:web` command below |
| `android `           | Run app on last used Android emulator/device |
| `ios`                | Run app on last used iOS simulator/device |
| `storybook:build`    | Generates static version of Storybook for deployment |
| `storybook:deploy`   | Deploys Storybook to [`homepage`](https://department-of-veterans-affairs.github.io/va-mobile-library) in `package.json` |
| `storybook:generate` | Generates `.storybook/native/storybook.requires.js` which tells React Native where to find stores since it doesn't support dynamic imports |
| `storybook:watch`    | Watches for newly created stories and regenerates `storybook.requires.js` |
| `storybook:web`      | Builds and launches development server for web |
| `tokensBuild`        | Builds the tokens package so they are available locally for use by Storybook |
