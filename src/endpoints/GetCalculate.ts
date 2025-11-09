import { addDataAndFileToRequest, Endpoint } from 'payload'
import { sendObjectEmail } from '@/hooks/sendObjectEmail'

type MetaItem = { key: string; value: string }
type typeOrderCall = {
  name?: string
  email?: string
}

export const GetCalculate: Endpoint = {
  path: '/get-calculate',
  method: 'post',
  handler: async (req) => {
    const apiKey = req.headers.get('x-api-key')
    const apiSecret = req.headers.get('x-api-secret')

    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return Response.json({ error: 'Unauthorized: invalid API keys' }, { status: 403 })
    }

    await addDataAndFileToRequest(req)
    if (typeof req.json !== 'function') {
      return Response.json({ error: 'JSON parsing not supported' }, { status: 400 })
    }

    const body = (await req.json()) as typeOrderCall

    const { name, email } = body

    if (!name) {
      return Response.json({ error: 'Поле "name" є обовʼязковим' }, { status: 400 })
    }
    if (!email) {
      return Response.json({ error: 'Поле "email" є обовʼязковим' }, { status: 400 })
    }

    const metaFields: MetaItem[] = [
      { key: 'name', value: name },
      ...(email ? [{ key: 'email', value: email }] : []),
    ]

    const newApp = await req.payload.create({
      collection: 'applications',
      data: {
        category: '689203f9065cfb1cde8f2b40',
        meta: metaFields,
      },
      overrideAccess: true,
    })
    await sendObjectEmail('< Get a calculator >', {
      name: name,
      email: email,
    })
    return Response.json({ success: true, data: newApp })
  },
}
