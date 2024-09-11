---
name: VADS – Icon update
about: Template for updating our assets package to include new VADS icons
title: DS - VADS icon update: ICON_NAME
labels: ["design-system", "front-end"]
assignees: ''

---
## Description 
Once VADS has added an icon to their sprite sheet, we need to perform a couple additional steps to extract it and get it added to our assets package.

- New icons: 
  - ICON_1
  - ICON_2
- [Link to VADS PR or Issue]()

## Acceptance Criteria
<!-- Add a checkbox for each item required to fulfill the user story/issue. -->  

- [ ] Update [component-library](https://www.npmjs.com/package/@department-of-veterans-affairs/component-library) in `assets/package.json` to the latest version
- [ ] Run the [extract-icons](https://github.com/department-of-veterans-affairs/va-mobile-library/blob/main/packages/assets/extract-svgs.js) script to extract the individual SVGs 
- [ ] Verify existence of new icon(s) and add it to the repo
- [ ] Publish a new version of the assets package
- [ ] Update components package to incorporate updated assets package
- [ ] Run [buildIconListFromAssets.js script](https://github.com/department-of-veterans-affairs/va-mobile-library/blob/main/packages/components/buildIconListFromAssets.js) to regenerate assets list
- [ ] Verify new icon(s) available in Storybook
- [ ] [Publish](https://github.com/department-of-veterans-affairs/va-mobile-library/actions/workflows/publish.yml) a new version of the components package
- [ ] Notify @jessicawoodin to add new icons in Figma
