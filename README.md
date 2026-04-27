# Contacts — React + FSD + MobX + Vite

Учебное приложение “Contacts” для практики:

- **React Router** (SPA навигация)
- архитектуры **Feature-Sliced Design (FSD)**
- **MobX**: observable state, actions, computed values, `flow`
- **mobx-react-lite**: интеграция MobX с React через `observer`
- загрузки данных через MobX stores
- сохранения избранного в `localStorage`

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
  - **persist** избранного в `localStorage` через `FavoritesStore`

---

## Использовано

- React `18`
- TypeScript
- React Router DOM `6` (с `future`-флагами)
- MobX
- mobx-react-lite
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

Контакты и группы загружаются с сервера через MobX stores.

Контакты:

```txt
GET https://mocki.io/v1/26aab5c3-46c0-4c0e-a42c-10437916d86b
```

Группы:

```txt
GET https://mocki.io/v1/883e8cde-55d6-4b4a-bdbc-0db1de7989c9
```

API layer:

- `src/shared/api/contacts-client.ts`
- `src/shared/api/contacts-api.constants.ts`

Контакты и группы хранятся в MobX stores:

- `src/entities/contact/model/contacts-store.ts`
- `src/entities/group/model/groups-store.ts`

---

## MobX architecture

Проект был мигрирован с Redux Toolkit / RTK Query на MobX.

### Что заменено при миграции

Redux / RTK Query слой:

- `configureStore`
- `createSlice`
- Redux reducers
- Redux selectors
- React Redux Provider
- typed hooks `useAppDispatch` / `useAppSelector`
- RTK Query `createApi`
- RTK Query generated hooks
- `redux-persist`

заменён на:

- `RootStore`
- `RootStoreProvider`
- `useRootStore`
- `ContactsStore`
- `GroupsStore`
- `FavoritesStore`
- `FiltersStore`
- `observer` из `mobx-react-lite`
- MobX `flow` для асинхронных запросов
- `localStorage` persist для избранного

### Server state

Server state хранится в MobX stores:

- `ContactsStore.contacts`
- `GroupsStore.groupContactsList`

Загрузка выполняется через MobX `flow`:

- `contactsStore.loadContacts()`
- `groupsStore.loadGroups()`

Stores также хранят `status` и `errorMessage`, чтобы страницы могли показывать loading/error/success состояния.

### Client state

Client-side состояние хранится в MobX stores:

- `FavoritesStore.favoriteContactIds` — список id избранных контактов
- `FiltersStore.nameQuery` — фильтр по имени
- `FiltersStore.groupId` — фильтр по группе

`FavoritesStore` сохраняет избранное в `localStorage`.

### Store

- `src/app/store/root-store.ts` — root store и конфигурация MobX
- `src/app/store/store-provider.tsx` — React provider для root store
- `src/app/store/store-context.ts` — context и `useRootStore`
- `src/entities/contact/model/contacts-store.ts` — контакты
- `src/entities/group/model/groups-store.ts` — группы
- `src/entities/favorites/model/favorites-store.ts` — избранное
- `src/features/filters/model/filters-store.ts` — фильтры

### React integration

Компоненты, которые читают observable state, обёрнуты в `observer`.

Пример:

```ts
export const ContactListPage = observer((): React.JSX.Element => {
  const { contactsStore, favoritesStore, filtersStore, groupsStore } =
    useRootStore();

  // render
});
```

`observer` подписывает компонент только на те observable values, которые были прочитаны во время render.

---

## Архитектура (FSD)

- `src/app/` — инициализация приложения, MobX root store, Provider
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
6. Обнови страницу на `/favorit` → избранное должно остаться в `localStorage`
7. В DevTools заблокируй `*mocki.io*` → должен появиться error state

## Установка зависимостей

```bash
npm i
```

## Запуск приложения

```bash
npm run dev
```
