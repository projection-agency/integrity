import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '../../../payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config: payloadConfig })

    // Отримуємо всі категорії
    const categories = await payload.find({
      collection: 'category-app',
      limit: 100,
    })

    return new Response(
      JSON.stringify({
        success: true,
        categories: categories.docs,
        total: categories.totalDocs,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Test API Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
