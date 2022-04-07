# Innbyggerpanelet

## Environmental variables

In order for this project to run in a local development environment you will have to configure an `.env` file. Most of the fields can be configured as you see fit, however there are OIDC keys which requires you to be a part of the @team-researchops namespace in order to obtain.

Please post in #researchops for more information/help.

## Commit naming conventions

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. **fix**: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
2. **feat**: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
3. **BREAKING CHANGE**: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
4. types other than fix: and feat: are allowed, for example build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
