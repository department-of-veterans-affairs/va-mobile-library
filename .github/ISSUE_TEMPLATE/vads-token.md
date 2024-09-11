---
name: VADS – Tokens update
about: Template for updating our tokens package to include new VADS tokens
title: DS - VADS Token update: TOKENS_DESCRIPTION
labels: ["design-system", "front-end"]
assignees: ''

---
## Description 
Once VADS has added tokens to their css-library package, we need to perform a couple additional steps to include them in our tokens package.

- [Link to VADS PR or Issue]()

## Tokens
  - primitive-token-1: VALUE
  - semantic-token-1: VALUE
  
## Acceptance Criteria
<!-- Add a checkbox for each item required to fulfill the user story/issue. -->  

- [ ] Update [css-library](https://www.npmjs.com/package/@department-of-veterans-affairs/css-library) in `tokens/package.json` to the latest version
- [ ] Run `yarn tokens:build` to rebuild our tokens 
- [ ] Check for any errors and verify the addition of the new tokens
- [ ] [Publish](https://github.com/department-of-veterans-affairs/va-mobile-library/actions/workflows/publish.yml) a new version of the tokens package
- [ ] Add new tokens to Storybook
- [ ] Notify @jessicawoodin to add new tokens to Figma
