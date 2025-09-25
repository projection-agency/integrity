import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../payload.config'
import { sendObjectEmail } from '../../../hooks/sendObjectEmail'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: payloadConfig })

    // Отримуємо дані з запиту
    const { name, email, phone } = await req.json()

    // Перевіряємо API ключі
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

    // Створюємо заявку через Payload
    const metaFields = [
      { key: 'name', value: name },
      { key: 'email', value: email },
      { key: 'phone', value: phone },
    ]

    console.log('Simple form meta fields:', metaFields)
    console.log('Simple form category ID:', '686e43d5cf0cc7b525cf1993')

    try {
      const newApp = await payload.create({
        collection: 'applications',
        data: {
          category: '686e43d5cf0cc7b525cf1993',
          meta: metaFields,
        },
        overrideAccess: true,
      })

      console.log('Simple application created successfully:', newApp)

      // Відправляємо email
      try {
        await sendObjectEmail('< Fill Form >', {
          name: name,
          email: email,
          phone: phone,
        })
        console.log('Email sent successfully for simple form')
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Не блокуємо створення заявки, якщо email не відправився
      }
    } catch (createError) {
      console.error('Error creating simple application:', createError)
      throw createError
    }

    return new Response(JSON.stringify({ success: true, data: { name, email, phone } }), {
      status: 200,
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    })
  }
}
