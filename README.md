# Contacts — React + FSD + Redux Toolkit + RTK Query + Vite

Учебное приложение “Contacts” для практики:

- **React Router** (SPA навигация)
- архитектуры **Feature-Sliced Design (FSD)**
- **Redux Toolkit**: `configureStore`, `createSlice`
- **RTK Query**: загрузка контактов и групп с сервера
- **React Redux typed hooks**
- **redux-persist** для сохранения избранного
- middleware + Redux DevTools

---

## Возможности

- Просмотр списка контактов
- Фильтрация контактов:
  - по имени (частичное совпадение)
  - по группе
  - Reset (сброс фильтров)
- Группы:
  - список групп
  - страница группы со списком контактов внутри
- Избранное:
  - список избранных контактов
  - добавление/удаление из избранного через ⭐/☆ на карточке контакта
  - **persist** избранного в `localStorage` (через `redux-persist`)

---

## Использовано

- React `18`
- TypeScript
- React Router DOM `6` (с `future`-флагами)
- Redux Toolkit
- RTK Query
- Redux `5`
- React Redux
- redux-persist
- Vite
- Bootstrap + React Bootstrap
- Formik
- ESLint + Prettier
- Vitest + Testing Library

---

## Роуты

- `/` — Contacts list
- `/contact/:contactId` — Contact page
- `/groups` — Groups list
- `/groups/:groupId` — Group page
- `/favorit` — Favorites list

---

## Скрипты

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm test
```

---

## Данные

Контакты и группы загружаются с сервера через **RTK Query**.

Контакты:

```txt
GET https://mocki.io/v1/26aab5c3-46c0-4c0e-a42c-10437916d86b
```

Группы:

```txt
GET https://mocki.io/v1/883e8cde-55d6-4b4a-bdbc-0db1de7989c9
```

API layer:

- `src/shared/api/contacts-api.ts`
- `src/shared/api/contacts-api.constants.ts`

Контакты и группы не копируются в обычные Redux slices. Они хранятся в RTK Query cache.

---

## Redux architecture

Проект был мигрирован с Classic Redux на Redux Toolkit.

### Что заменено

Classic Redux boilerplate:

- `createStore`
- `applyMiddleware`
- ручные action types
- ручные action creators
- ручные reducers через `switch`
- thunk-инициализация моковых данных

заменён на:

- `configureStore`
- `createSlice`
- RTK Query `createApi`
- RTK Query `fetchBaseQuery`
- auto-generated query hooks
- typed hooks для `useDispatch` / `useSelector`

### Server state

Server state хранится в RTK Query cache:

- contacts
- groups

Это позволяет не дублировать данные в обычном Redux state и не писать вручную loading/error/cache logic.

### Client state

Client-side состояние хранится в обычных Redux Toolkit slices:

- `favorites` — список id избранных контактов
- `filters` — значения фильтрации контактов

`favorites` сохраняется в `localStorage` через `redux-persist`.

### Store

- `src/app/store/store.ts` — `configureStore`, `persistStore`, middleware
- `src/app/store/root-reducer.ts` — root reducer
- `src/app/store/hooks.ts` — typed hooks:
  - `useAppDispatch`
  - `useAppSelector`

RTK Query reducer подключён через:

```ts
[contactsApi.reducerPath]: contactsApi.reducer
```

RTK Query middleware подключён через:

```ts
getDefaultMiddleware().concat(contactsApi.middleware, metricsMiddleware);
```

---

## Архитектура (FSD)

- `src/app/` — инициализация приложения, store, Provider
- `src/pages/` — страницы приложения
- `src/widgets/` — крупные UI-блоки: Layout, Menu, Breadcrumbs
- `src/features/` — пользовательские сценарии и фичи: filters
- `src/entities/` — доменные сущности: contact, group, favorites
- `src/shared/` — общие API, конфиги, утилиты и UI

### Aliases

- `@app/*`
- `@pages/*`
- `@features/*`
- `@widgets/*`
- `@entities/*`
- `@shared/*`

---

## Quick QA

1. Открой `/` → фильтр по имени работает
2. Выбери группу → фильтр по группе работает
3. Перейди в `/groups` → список групп
4. Открой группу `/groups/:groupId` → видны контакты группы
5. Открой `/favorit` → список избранных
6. Обнови страницу на `/favorit` → избранное должно остаться (persist)
7. В DevTools заблокируй `*mocki.io*` → должен появиться error state

## Установка зависимостей

```bash
npm i
```

## Запуск приложения

```bash
npm run dev
```
