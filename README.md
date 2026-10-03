# Aviora

Discover Italy. Study here. Live here.

An editorial site about studying and living in Italy, plus **FIRST 30**, a small app that tells international students arriving in Milan (and Amsterdam) what to do today, in the right order.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · next-intl (EN, RU) · Zustand · Vitest

Every page is statically generated for both locales, so the whole site can be served from a CDN. There is no backend: FIRST 30 keeps a student's progress in their own browser.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint, types, tests, translation keys
npm run build
```

Copy `.env.example` to `.env` and set `NEXT_PUBLIC_SITE_URL` before a production build. It is used for canonical links and the sitemap.

## Structure

```
src/
  app/                 routes only: params, metadata, static params
    [locale]/(site)/   editorial pages with the site header and footer
    [locale]/first-30/[city]/  the app, with its own shell
  views/               page compositions, one folder per page
  widgets/             blocks shared by several pages (header, footer, city index)
  features/first30/
    data/              city guides: tasks, dependencies, sources, places
    model/             pure logic (priorities, days, budget) and the store
    ui/                dashboard, onboarding, task page, timeline, map, budget
  content/             editorial content in EN and RU
  shared/              design primitives, config, helpers
  i18n/                routing and request config
messages/              UI strings (en.json, ru.json)
```

Dependencies point one way: `app → views → widgets/features → shared`.

## How FIRST 30 picks today's three priorities

`features/first30/model/priorities.ts` is a pure function of the task list, what is done and the day of the stay:

- a task is ready when its window has opened and everything it depends on is done or does not apply to the student
- ready tasks are scored on deadline pressure, importance, how many tasks they unblock, and effort
- three are chosen with at most two per category and about 90 minutes in total
- "You might also need" fills in categories the priorities do not cover

`priorities.test.ts` pins the day-7 screen from the brief: Residence registration, Student ID, Find a supermarket, then Bank account, Healthcare and Transport.

## Adding a city

Add `features/first30/data/<city>.ts` with the same `CityGuide` shape, register it in `data/index.ts`, and add the id to `CityId`. The data tests check ids, dependencies and cycles. No UI changes are needed.

## Deploying

- **Vercel**: import the repository, set `NEXT_PUBLIC_SITE_URL`, deploy.
- **Docker**: `docker build -t aviora . && docker run -p 3000:3000 aviora`
- **Any Node host**: `npm run build && npm start`

## Content notes

Fees, addresses and procedures change. Task pages link to the official source for each step; check them before each intake. Photos come from the client's moodboard: confirm licences before launch.
