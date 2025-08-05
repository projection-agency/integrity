import { NextRequest } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type MetaItem = { key: string; value: string }

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json()

  const apiKey = req.headers.get('x-api-key')
  const apiSecret = req.headers.get('x-api-secret')

  if (
    apiKey !== process.env.NEXT_PUBLIC_API_KEY ||
    apiSecret !== process.env.NEXT_PUBLIC_API_SECRET
  ) {
    return new Response(JSON.stringify({ error: 'Unauthorized: invalid API keys' }), {
      status: 403,
    })
  }

  if (!name || !email || !phone) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
    })
  }

  const payload = await getPayload({ config: configPromise })

  const metaFields: MetaItem[] = [
    { key: 'name', value: name },
    { key: 'email', value: email },
    { key: 'phone', value: phone },
  ]

  const newApp = await payload.create({
    collection: 'applications',
    data: {
      category: '686e43d5cf0cc7b525cf1993',
      meta: metaFields,
    },
  })

  return new Response(JSON.stringify({ success: true, data: newApp }), {
    status: 200,
  })
}
