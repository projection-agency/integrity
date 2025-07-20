import { getPayload } from 'payload'
import config from 'next/config'

export async function getMainInfo(locale: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig as any })

  const main = await payload.findGlobal({ slug: 'main' })

  return main
}
