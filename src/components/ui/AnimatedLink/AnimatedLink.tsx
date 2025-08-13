'use client'

import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'

interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const AnimatedLink = ({
  children,
  href,
  className,
  onClick,
  ...props
}: AnimatedLinkProps) => {
  const router = useRouter()

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const main = document.querySelector('main')
    const body = document.body

    main?.classList.add('page-transition')
    body.classList.add('body-transition')

    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    )

    try {
      onClick?.(e)
      router.prefetch(href)

      // Миттєвий перехід
      await sleep(50)
      router.push(href)

      // Тримаємо накладку, поки нова сторінка готується
      await sleep(600)
    } finally {
      main?.classList.remove('page-transition')
      body.classList.remove('body-transition')
    }
  }

  return (
    <Link onClick={handleTransition} href={href} className={className} {...props}>
      {children}
    </Link>
  )
}
