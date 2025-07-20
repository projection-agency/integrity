import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getLayoutData(locale: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const main = await payload.findGlobal({ slug: 'main', locale: locale as 'en' })
  const menuGlobal = await payload.findGlobal({ slug: 'menu', locale: locale as 'en' })

  const headerMenu = Array.isArray(menuGlobal?.['header-menu'])
    ? menuGlobal['header-menu'].map(({ id, ...rest }) => ({
        ...rest,
        id: typeof id === 'string' ? id : undefined,
      }))
    : []

  return {
    main,
    headerMenu,
  }
}
