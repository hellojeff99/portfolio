# 양성원 Portfolio

## 콘텐츠 관리

포트폴리오의 반복 콘텐츠는 Astro Content Collections로 관리합니다.

- 프로필: `src/content/profile.md`
- 프로젝트 및 경력: `src/content/projects/**/*.md`
- 기술 그룹: `src/content/skills.md`
- 학력: `src/content/educations.md`
- 자격증: `src/content/certifications.md`

각 Markdown 파일의 frontmatter는 컬렉션 스키마로 검증합니다. 프로젝트는
파일명의 숫자 접두사로, 단일 파일의 목록은 배열 순서로 화면 표시 순서를
결정합니다. 스키마와 맞지 않는 값은 빌드 시 오류로 알려줍니다.

컬렉션별 스키마는 `src/content/collections/*.ts`에 분리되어 있고,
`src/content.config.ts`는 컬렉션을 등록하는 진입점 역할만 합니다.

## 개발

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
