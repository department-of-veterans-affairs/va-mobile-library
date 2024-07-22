# Release process

Production releases for libraries within va-mobile-library are currently
triggered manually by engineers after each merge into the `main` branch. We have
a [Publish Workflow in GitHub Actions](https://github.com/department-of-veterans-affairs/va-mobile-library/actions/workflows/publish.yml) 
which automatically increments the specified package's version, creates a git 
tag, and publishes a new version to NPM. 

Alpha and beta releases are also released using the same workflow, but are 
typically triggered from a development branch. See the [Versioning Policy](./versioning.md) 
for an explanation on how we handle versioning.

## Git tags

Upon each release, a git tag is created for the release with a format of
[package]-v[X.X.X] which allows for historical snapshots of each version. For 
example:

- components-v0.19.0
- assets-v0.10.0
- tokens-v0.12.0
- linting-v0.19.0

Alpha and beta builds have `-[alpha/beta].[number]` appended to the tag. For 
example:
- components-v0.19.0-alpha.1

## Sign-off process

There is currently no sign-off process for releases. After work has been 
reviewed and tested, engineers create releases as needed upon merges to the 
`main` branch. As our team gets larger and other apps start to consume the 
library, we may explore adding a sign-off process and extending our release 
cadence.

## Release notes
A [changelog](changelog.md) is automatically generated upon each release which 
notes the merged pulled requests and closed issues since the last release. A 
slack notification is also sent to the [#va-mobile-library-alerts](https://dsva.slack.com/archives/C062TM03HN2) 
channel in DSVA slack.
