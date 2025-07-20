import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getLayoutData() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const main = await payload.findGlobal({ slug: 'main' })
  const menuGlobal = await payload.findGlobal({ slug: 'menu' })

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
