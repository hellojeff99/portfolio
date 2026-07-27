## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Styling Rules

- Use Tailwind CSS utility classes and installed Tailwind CSS plugins for all styling.
- Do not use inline `style` attributes in JSX or TSX.
- Do not use alternative styling solutions such as CSS Modules, styled-components, or Emotion.
- Prefer daisyUI component classes when styling components.
- Use Tailwind CSS utility classes for layouts and detailed adjustments that cannot be handled adequately with daisyUI.
- Before adding a new Tailwind CSS plugin or UI library, verify whether the requirement can be implemented using the existing setup.
- Do not add custom CSS to `globals.css`; use it only to import and configure Tailwind CSS and its plugins.

## Commit Rules

- Write all commit messages in Korean.
- Use the following format:

```text
<type>: <Korean description>
```

- Keep each commit focused on one logical change.
- Use clear and specific descriptions.
- Do not include unrelated changes in the same commit.
- Commit only after the build and relevant tests pass.

### Types

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test changes
- `docs`: Documentation changes
- `chore`: Configuration or maintenance
