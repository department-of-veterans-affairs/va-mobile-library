# VA Mobile Design Tokens

This repo contains the design tokens for the VA Mobile Design Library. It uses [Style Dictionary](https://amzn.github.io/style-dictionary/#/) as a build system to define our styles in JSON and export them to different formats.

## Commands

| Command              | Description                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| yarn build           | Takes any JSON files in the `src/tokens` folder and transforms them according to the defined transformations in the `config.json` |
| yarn publish-package | Publishes the packages to npm                                                                                                     |
