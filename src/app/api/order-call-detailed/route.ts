import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../payload.config'
import { sendObjectEmail } from '../../../hooks/sendObjectEmail'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: payloadConfig })

    // Отримуємо дані з запиту
    const { name, email, phone, country, employees, position, industry, stage, website, message } =
      await req.json()

    console.log('Detailed form submitted:', {
      name,
      email,
      phone,
      country,
      employees,
      position,
      industry,
      stage,
      website,
      message,
    })
    console.log('Message field value:', message)
    console.log('Message field type:', typeof message)

    // Перевіряємо API ключі
    const apiKey = req.headers.get('x-api-key')
    const apiSecret = req.headers.get('x-api-secret')

    if (
      apiKey !== process.env.NEXT_PUBLIC_API_KEY ||
      apiSecret !== process.env.NEXT_PUBLIC_API_SECRET
    ) {
      console.log('API key mismatch:', {
        received: { apiKey, apiSecret },
        expected: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          apiSecret: process.env.NEXT_PUBLIC_API_SECRET,
        },
      })
      return new Response(JSON.stringify({ error: 'Unauthorized: invalid API keys' }), {
        status: 403,
      })
    }

    // Перевіряємо обов'язкові поля
    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      })
    }

    // Створюємо заявку в базі даних через Payload
    const metaFields = [
      { key: 'name', value: name },
      { key: 'email', value: email },
      { key: 'phone', value: phone },
      { key: 'country', value: country || '' },
      { key: 'employees', value: employees?.toString() || '' },
      { key: 'position', value: position || '' },
      { key: 'industry', value: industry || '' },
      { key: 'stage', value: stage || '' },
      { key: 'website', value: website || '' },
      { key: 'message', value: message || '' },
    ]

    console.log('Meta fields prepared:', metaFields)
    console.log('Category ID:', '686e4d39cf0cc7b525cf1caf')

    try {
      const newApp = await payload.create({
        collection: 'applications',
        data: {
          category: '686e4d39cf0cc7b525cf1caf',
          meta: metaFields,
        },
        overrideAccess: true,
      })

      console.log('Application created successfully:', newApp)

      // Відправляємо email
      try {
        const emailData = {
          name: name,
          email: email,
          phone: phone,
          country: country,
          employees: employees,
          position: position,
          industry: industry,
          stage: stage,
          website: website,
          message: message,
        }
        console.log('Email data being sent:', emailData)

        await sendObjectEmail('< Strategy Form >', emailData)
        console.log('Email sent successfully for detailed form')
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Не блокуємо створення заявки, якщо email не відправився
      }
    } catch (createError) {
      console.error('Error creating application:', createError)
      throw createError
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Detailed form submitted and saved successfully',
        data: { name, email, phone, country, employees, position, industry, stage, website },
      }),
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error('API Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    })
  }
}
