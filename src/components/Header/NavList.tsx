'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import s from './Header.module.css'
import { AnimatedLink } from '@/components/ui/AnimatedLink/AnimatedLink'

export type MenuItem = {
  label: string
  link: string
  id?: string
}

export default function NavList({
  menu,
  handleClose,
}: {
  menu: MenuItem[]
  handleClose: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState<string>('')

  // Функція для визначення поточної секції на основі хеша
  const getCurrentSectionFromHash = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1) // Видаляємо #
      // Фільтруємо технічні хеші
      if (
        hash &&
        !hash.startsWith('clip') &&
        !hash.startsWith('defs') &&
        !hash.startsWith('linearGradient') &&
        !hash.startsWith('radialGradient') &&
        !hash.startsWith('filter') &&
        !hash.startsWith('mask') &&
        !hash.startsWith('pattern') &&
        !hash.startsWith('symbol') &&
        !hash.startsWith('use') &&
        !hash.includes('_') &&
        hash.length > 3
      ) {
        return hash
      }
    }
    return ''
  }

  // Функція для нормалізації лінку
  const normalizeLink = (link: string) => {
    // Видаляємо початковий слеш якщо є
    return link.startsWith('/') ? link.slice(1) : link
  }

  // Функція для перевірки чи поточний шлях відповідає лінку меню
  const isCurrentPage = (link: string) => {
    // Якщо лінк починається з #, це хеш-лінк
    if (link.startsWith('#')) {
      const hash = link.slice(1)
      // Якщо ми на головній сторінці, перевіряємо поточну секцію
      if (pathname === '/' || pathname.endsWith('/en') || pathname.endsWith('/ua')) {
        return currentSection === hash
      }
      // Якщо ми не на головній сторінці, не підсвічуємо хеш-лінки
      return false
    }

    // Нормалізуємо лінк та pathname для порівняння
    const normalizedLink = normalizeLink(link)
    const normalizedPathname = normalizeLink(pathname)

    // Перевіряємо різні варіанти збігу
    return (
      normalizedPathname === normalizedLink ||
      normalizedPathname.endsWith(normalizedLink) ||
      normalizedPathname === `${normalizedLink}/` ||
      normalizedPathname.endsWith(`/${normalizedLink}`)
    )
  }

  // Функція для обробки кліків по лінках
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    // Якщо це хеш-лінк, обробляємо плавний скрол
    if (link.startsWith('#')) {
      e.preventDefault()
      const targetId = link.slice(1)

      // Якщо ми не на головній сторінці, переходимо на головну з якорем
      if (pathname !== '/' && !pathname.endsWith('/en') && !pathname.endsWith('/ua')) {
        // Отримуємо поточну локаль з pathname
        const locale = pathname.split('/')[1] || 'en'
        // Використовуємо router.push замість window.location.href
        router.push(`/${locale}${link}`)
        return
      }

      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Встановлюємо поточну секцію одразу при кліку
        setCurrentSection(targetId)

        // Плавний скрол до елемента
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

        // Оновлюємо хеш в URL
        if (typeof window !== 'undefined' && window.history && window.history.pushState) {
          window.history.pushState(null, '', link)
        }
      }
    }
    // Для звичайних лінків залишаємо стандартну поведінку
  }

  useEffect(() => {
    // Функція для ініціалізації поточної секції
    const initializeCurrentSection = () => {
      // Тільки якщо ми на головній сторінці
      if (pathname === '/' || pathname.endsWith('/en') || pathname.endsWith('/ua')) {
        const hash = getCurrentSectionFromHash()
        if (hash) {
          setCurrentSection(hash)

          // Якщо є хеш в URL, скролимо до відповідної секції після завантаження
          setTimeout(() => {
            const targetElement = document.getElementById(hash)
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
          }, 100)
        }
      } else {
        // Якщо ми не на головній сторінці, очищаємо поточну секцію
        setCurrentSection('')
      }
    }

    // Встановлюємо початкову секцію з хеша
    initializeCurrentSection()

    // Створюємо Intersection Observer для відстеження секцій (тільки на головній сторінці)
    if (pathname === '/' || pathname.endsWith('/en') || pathname.endsWith('/ua')) {
      const observerOptions = {
        rootMargin: '-20% 0px -70% 0px', // Налаштовуємо зону видимості
        threshold: 0,
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            // Додаткова перевірка, щоб уникнути оновлення URL для технічних елементів
            if (
              sectionId &&
              !sectionId.startsWith('clip') &&
              !sectionId.startsWith('defs') &&
              !sectionId.startsWith('linearGradient') &&
              !sectionId.startsWith('radialGradient') &&
              !sectionId.startsWith('filter') &&
              !sectionId.startsWith('mask') &&
              !sectionId.startsWith('pattern') &&
              !sectionId.startsWith('symbol') &&
              !sectionId.startsWith('use') &&
              !sectionId.includes('_') &&
              sectionId.length > 3
            ) {
              setCurrentSection(sectionId)
              // Оновлюємо URL без перезавантаження сторінки
              if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
                window.history.replaceState(null, '', `#${sectionId}`)
              }
            }
          }
        })
      }, observerOptions)

      // Функція для додавання секцій до observer
      const addSectionsToObserver = () => {
        // Спочатку шукаємо основні секції з класами, які зазвичай використовуються для навігації
        const mainSections = document.querySelectorAll(
          'section[id], [data-section], .section[id], main section[id]',
        )
        mainSections.forEach((section) => {
          const id = section.getAttribute('id')
          if (
            id &&
            !id.startsWith('clip') &&
            !id.startsWith('defs') &&
            !id.startsWith('linearGradient') &&
            !id.startsWith('radialGradient') &&
            !id.startsWith('filter') &&
            !id.startsWith('mask') &&
            !id.startsWith('pattern') &&
            !id.startsWith('symbol') &&
            !id.startsWith('use') &&
            !id.includes('_') &&
            id.length > 3
          ) {
            // Виключаємо короткі ID та ID з підкресленнями
            observer.observe(section)
          }
        })
      }

      // Додаємо секції до observer після невеликої затримки
      setTimeout(addSectionsToObserver, 100)

      // Слухаємо зміни хеша
      const handleHashChange = () => {
        setCurrentSection(getCurrentSectionFromHash())
      }

      window.addEventListener('hashchange', handleHashChange)

      return () => {
        observer.disconnect()
        window.removeEventListener('hashchange', handleHashChange)
      }
    }
  }, [pathname]) // Додаємо pathname як залежність

  return (
    <nav className={s.navList}>
      <ul>
        {menu.map((item) => (
          <li key={item.id || item.link} className={isCurrentPage(item.link) ? s.current : ''}>
            {item.link.startsWith('#') ? (
              <a href={item.link} onClick={(e) => handleLinkClick(e, item.link)}>
                {item.label}
              </a>
            ) : (
              <AnimatedLink
                href={item.link}
                onClick={() => {
                  handleClose()
                }}
              >
                {item.label}
              </AnimatedLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
