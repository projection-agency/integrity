'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import s from './Header.module.css'

export type MenuItem = {
  label: string
  link: string
  id?: string
}

export default function NavList({ menu }: { menu: MenuItem[] }) {
  const pathname = usePathname()
  const [currentSection, setCurrentSection] = useState<string>('')

  // Функція для визначення поточної секції на основі хеша
  const getCurrentSectionFromHash = () => {
    if (typeof window !== 'undefined') {
      return window.location.hash.slice(1) // Видаляємо #
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
        window.location.href = `/${locale}${link}`
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
            if (sectionId) {
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
        const sections = document.querySelectorAll('section[id], div[id], [id]')
        sections.forEach((section) => {
          const id = section.getAttribute('id')
          if (id) {
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
            <a href={item.link} onClick={(e) => handleLinkClick(e, item.link)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
