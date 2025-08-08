import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { tags, token } = body as { tags?: string[]; token?: string }

    // Простий захист: якщо задано токен в env, перевіряємо його
    const expected = process.env.REVALIDATE_TOKEN
    if (expected && token !== expected) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json({ ok: false, error: 'No tags' }, { status: 400 })
    }

    for (const t of tags) revalidateTag(t)

    return NextResponse.json({ ok: true, revalidated: tags })
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}
