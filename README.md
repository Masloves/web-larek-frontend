# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения

Для реализации приложения выбран паттерн **MVP**. В нём приложение делится на три компонента:

- **Model** (Модель) работает с данными, проводит вычисления и руководит всеми бизнес-процессами.
- **View** (Вид или представление) показывает пользователю интерфейс и данные из модели.
- **Presenter** (Представитель) служит прослойкой между моделью и видом.

## Данные и типы данных, используемые в приложении

```typescript
export interface IProduct {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	price: number;
}
```
```typescript
export interface IProductsCatalog {
    items: IProduct[];
}
```

```typescript
export interface IContacts {
    payment: string;
    address: string;
    email: string;
    phone: string;
}
```

```typescript
export interface IOrder extends IContacts {
    items: string[];
    total: number;
}
```

```typescript
export type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;
export type TContactsForm = Pick<IOrder, 'email' | 'phone'>;
export type TForm = TPaymentForm & TContactsForm;
export type FormErrors = Partial<Record<keyof TForm, string>>;
export type TSuccess = Pick<IBasket, 'total'>;
```

```typescript
export interface IBasket {
    items: HTMLElement[];
    total: number;
}
```

```typescript
export interface IOrderAnswer {
    id: string;
    total: number;
}
```

```typescript
export interface ICard {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
    index: number;
}
```

```typescript
export interface IPage {
    products: HTMLElement[];
    counter: number;
}
```

```typescript

```

```typescript

```