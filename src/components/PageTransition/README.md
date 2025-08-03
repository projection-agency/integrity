# Система анімацій переходів між сторінками

Ця система забезпечує плавні анімації переходів між сторінками з відстеженням завантаження та наступними ефектами:

## Особливості

- **Хедер залишається на місці** під час переходів
- **Фон стає темним** (#222) під час анімації
- **Попередня сторінка опускається вниз** і стає прозорою
- **Нова сторінка піднімається знизу** і з'являється з прозорості
- **Плавні анімації** з використанням Framer Motion
- **Відстеження завантаження** сторінок з лоадером
- **Контент не відображається** до повного завантаження
- **Попередня сторінка приховується** під час переходу

## Компоненти

### PageTransitionProvider

Контекст для управління станом анімацій переходів.

### PageTransition

Компонент, що обгортає контент сторінки і забезпечує анімації.

### AnimatedLinkWrapper

Заміна для звичайного `Link` з підтримкою анімацій переходів. Використовується тільки всередині PageTransitionProvider.

### TransitionBackground

Компонент для анімації фону під час переходів.

### PageLoader

Компонент для відображення стану завантаження сторінки.

### PageLoadHandler

Компонент для автоматичного відстеження завантаження сторінки.

### PageTransitionOverlay

Компонент для приховування попередньої сторінки під час переходів.

## Використання

### 1. Заміна звичайних Link на AnimatedLink

```tsx
// Замість
import Link from 'next/link'
;<Link href="/about">About</Link>

// Використовуйте
import AnimatedLink from '@/components/AnimatedLink/AnimatedLinkWrapper'
;<AnimatedLink href="/about">About</AnimatedLink>
```

### 2. Хеш-лінки (якорі) залишаються без змін

```tsx
// Хеш-лінки не потребують AnimatedLink
<a href="#section">Section</a>
```

### 3. Програмний перехід

```tsx
import { usePageTransition } from '@/contexts/PageTransitionContext'

const { startTransition } = usePageTransition()

// Запуск анімації переходу
await startTransition('/about')
```

## Налаштування

### Тривалість анімацій

Можна змінити в `src/contexts/PageTransitionContext.tsx`:

```tsx
// Затримка для анімації виходу
await new Promise((resolve) => setTimeout(resolve, 400))

// Затримка для анімації входу
await new Promise((resolve) => setTimeout(resolve, 400))
```

### Кольори фону

Можна змінити в `src/components/TransitionBackground/TransitionBackground.module.css`:

```css
.transitionBackground {
  background-color: #222; /* Змініть на потрібний колір */
}
```

## Структура файлів

```
src/
├── contexts/
│   ├── PageTransitionContext.tsx
│   └── PageLoadingContext.tsx
├── components/
│   ├── PageTransition/
│   │   ├── PageTransition.tsx
│   │   ├── PageTransitionOverlay.tsx
│   │   ├── PageTransition.module.css
│   │   └── README.md
│   ├── AnimatedLink/
│   │   └── AnimatedLinkWrapper.tsx
│   ├── TransitionBackground/
│   │   ├── TransitionBackgroundWrapper.tsx
│   │   └── TransitionBackground.module.css
│   ├── PageLoader/
│   │   ├── PageLoader.tsx
│   │   └── PageLoader.module.css
│   └── PageLoadHandler/
│       └── PageLoadHandler.tsx
└── hooks/
    └── usePageLoad.ts
```

## Інтеграція

Система вже інтегрована в `src/app/(frontend)/[locale]/layout.tsx`:

```tsx
<PageLoadingProvider>
  <PageTransitionProvider>
    <PageLoadHandler />
    <PageLoader />
    <PageTransitionOverlay />
    <TransitionBackground />
    <Header />
    <PageTransition>
      <main>{children}</main>
    </PageTransition>
    <Footer />
  </PageTransitionProvider>
</PageLoadingProvider>
```
