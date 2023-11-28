
<!-- PR title naming convention:
'[Issue type] Brief summary of issue suitable for changelog or copy/paste issue title',
where Issue type = bug, feature, spike, CU (code upkeep), etc.-->

<!-- Preferred branch naming convention:
'[Issue type]/[Issue #]-[Your name]-[Summary of issue]',
where Issue type = bug, feature, spike, CU (code upkeep), etc.-->

<!-- Update w/ ticket number to cross-repo link PR and ticket; ZenHub URL does not work -->
**[Ticket # ](https://github.com/department-of-veterans-affairs/va-mobile-app/issues/# )**

## Description of Change
<!-- Describe the change and context with which it was made beyond ACs unless straightforward.
Consider:
 - What is relevant to code reviewer(s) and not in the ticket?
 - What context may be relevant to a future dev or you in 6 months about this PR?
 - Did the course of work lead to notable dead ends? If so, why didn't they pan out?
 - Did the change add new dependencies? Why?
 - Were there important sources to link? Examples: an open bug with a dependency project, an article of someone else solving the same problem that was partially or wholly copied, external documentation relevant to solution -->

#### Testing Packages
<!-- List or range of alpha/beta packages published in association with this PR, if any -->

### Screenshots/Video
<!-- Add screenshots or video as needed; before/after recommended if appropriate. 
Convenience side-by-side formatting:
Before/after: <img src="" width="49%" />&nbsp;&nbsp;<img src="" width="49%" />
Accordion before/after: <details><summary>Before/after</summary><img src="" width="49%" />&nbsp;&nbsp;<img src="" width="49%" /></details>
-->

## Testing
<!-- Describe testing conducted to validate changes.
Consider highlighting:
- What testing was not explicitly done and may be relevant for QA? 
- Edge cases validated
- Special situations that could not be tested
- Any testing performed in a consuming app -->

- [ ] Tested on iOS <!-- simulator is fine -->
- [ ] Tested on Android <!-- simulator is fine -->
- [ ] Tested on Web

## PR Checklist
Code reviewer validation:
- General
	- [ ] PR is linked to ticket(s)
	- [ ] PR has 'changelog' label applied if it's to be included in the changelog
	- [ ] Acceptance criteria: 
		- All satisfied _or_
		- Documented reason for not being performed _or_
		- Split to separate ticket and ticket is linked by relevant AC(s)
	- [ ] Above PR sections adequately filled out
	- [ ] If any breaking changes, in accordance with the [pre-1.0.0 versioning guidelines](https://github.com/department-of-veterans-affairs/va-mobile-library#versioning-policy): a CU ticket has been created for the VA Mobile App detailing necessary adjustments with the package version that will be published by this ticket
- Code
	- [ ] Tests are included if appropriate (or split to separate ticket)
	- [ ] New functions have proper TSDoc annotations

## Publish
<!-- Most changes entail a version increment; section can be removed for PRs exclusively within non-ship-relevant files (e.g. unit tests, Storybook stories) -->
If changes warrant a new version [per the versioning guidelines](https://github.com/department-of-veterans-affairs/va-mobile-library#versioning-policy) and the PR is approved and ready to merge:
- [ ] Merge `main` into branch
- [ ] Merge branch to `main`
- [ ] [Publish new version](https://github.com/department-of-veterans-affairs/va-mobile-library/actions/workflows/publish.yml)
