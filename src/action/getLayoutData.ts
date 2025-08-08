import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

export async function getLayoutData(locale: string) {
  const cached = unstable_cache(
    async (loc: string) => {
      const payloadConfig = await config
      const payload = await getPayload({ config: payloadConfig })

      const [main, menuGlobal] = await Promise.all([
        payload.findGlobal({ slug: 'main', locale: loc as 'en' }),
        payload.findGlobal({ slug: 'menu', locale: loc as 'en' }),
      ])

      const headerMenu = Array.isArray(menuGlobal?.['header-menu'])
        ? menuGlobal['header-menu'].map(({ id, ...rest }: any) => ({
            ...rest,
            id: typeof id === 'string' ? id : undefined,
          }))
        : []

      const footerMenu = Array.isArray(menuGlobal?.['footer-menu'])
        ? menuGlobal['footer-menu'].map(({ id, ...rest }: any) => ({
            ...rest,
            id: typeof id === 'string' ? id : undefined,
          }))
        : []

      return {
        main,
        headerMenu,
        footerMenu,
      }
    },
    ['layout-data', locale],
    { revalidate: 300, tags: ['layout', 'menu', `layout-${locale}`, `menu-${locale}`] },
  )

  return cached(locale)
}
