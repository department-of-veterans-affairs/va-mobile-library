# VA Mobile Design System - Assets Package

The Assets package contains static assets such as fonts, images, and SVG icons for use by VA mobile applications. 

## For consumers

The Assets package is a peer dependency to the Components package so it is expected to be added separately via your package manager (e.g. yarn) alongside using components. It does not contain any code, so it is up to the consumer to configure the package to be leveraged by their app, [notably the fonts so they are available within your app](https://blog.logrocket.com/adding-custom-fonts-react-native/) for the components.

The [components package](https://github.com/department-of-veterans-affairs/va-mobile-library/tree/main/packages/components) contains [an Icon convenience component](https://github.com/department-of-veterans-affairs/va-mobile-library/blob/main/packages/components/src/components/Icon/Icon.tsx) that makes leveraging both the assets package icons and custom SVGs specific to your app easy; it is highly recommended to use for icon needs. A visual list of available icons can be found in [Storybook](https://department-of-veterans-affairs.github.io/va-mobile-library/?path=/docs/icon--docs).

## For contributors
Before contributing, consider if the contribution is necessary. This package is intended for shared assets. If your asset is only relevant to a specific app, then it should be handled within the app. 

### Fonts and Images
For fonts and images, contributing is as simple as adding the asset [to the package via the GitHub web interface](https://github.com/department-of-veterans-affairs/va-mobile-library/tree/main/packages/assets) using the add file/folder buttons and creating a PR.

### Icons

The majority of the included icons originate from [a sprite sheet from @department-of-veterans-affairs/component-library](https://github.com/department-of-veterans-affairs/component-library/blob/main/packages/web-components/src/img/sprite.svg). We have a script which extracts each of the SVGs from the sprite and saves them to the `icons/vads` folder. This makes them easier to use with the aforementioned Icon component. 

For icons intended for use across VA web and mobile, please consult with VADS as they must be [approved by the Design System Council](https://design.va.gov/about/contributing-to-the-design-system/suggest-an-addition-or-update) before they can be added to the source sprite. Keep in mind the Icon convenience component can handle custom SVGs to help display an app-specific icon without it being part of the assets package.
