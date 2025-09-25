# Integrity

Проєкт на базі Payload CMS + Next.js.

## Встановлення та запуск

1. Встановіть Node.js (18.20.2 або >=20.9.0) та pnpm (9 або 10).
2. Клонуйте репозиторій:
   ```bash
   git clone https://github.com/projection-agency/integrity.git
   cd integrity
   ```
3. Скопіюйте файл змінних середовища:
   ```bash
   cp .env.example .env
   ```
   Вкажіть у `.env` свій `MONGODB_URI` та інші необхідні змінні.
4. Встановіть залежності:
   ```bash
   pnpm install
   ```
5. Запустіть у режимі розробки:
   ```bash
   pnpm dev
   ```
   Проєкт буде доступний на https://www.integritymarketing.systems

## Тестування

- Запуск тестів:
  ```bash
  pnpm test
  ```

---

Для питань — звертайтесь у Discord Payload або створіть issue у репозиторії.
