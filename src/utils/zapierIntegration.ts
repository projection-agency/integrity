// utils/zapierIntegration.ts - винесемо логіку в окремий файл
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const sendToZapier = async (
  collection: string,
  operation: 'create' | 'update' | 'delete',
  doc: any,
  req: any,
  previousDoc?: any
) => {
  try {
    // Отримуємо налаштування Zapier з Global
    const zapierSettings = await req.payload.findGlobal({
      slug: 'zapier-settings',
      req,
    })

    // Перевіряємо чи увімкнена інтеграція
    if (!zapierSettings?.enabled) {
      console.log('Zapier integration is disabled')
      return false
    }

    // Перевіряємо чи є webhook URL
    if (!zapierSettings?.webhookURL) {
      console.warn('Zapier enabled but no webhook URL provided')
      return false
    }

    // Перевіряємо чи потрібно відстежувати цю колекцію
    if (!zapierSettings.collections?.includes(collection)) {
      console.log(`Collection "${collection}" not tracked by Zapier`)
      return false
    }

    // Перевіряємо чи потрібно відстежувати цю операцію
    if (!zapierSettings.operations?.includes(operation)) {
      console.log(`Operation "${operation}" not tracked by Zapier`)
      return false
    }

    // Готуємо payload для Zapier
    const zapierPayload = {
      collection,
      operation,
      data: doc,
      previousData: previousDoc,
      timestamp: new Date().toISOString(),
      changes: operation === 'update' && previousDoc ? {
        // Знаходимо які поля змінились
        changedFields: Object.keys(doc).filter(key =>
          JSON.stringify(doc[key]) !== JSON.stringify(previousDoc[key])
        )
      } : undefined
    }

    // Якщо тестовий режим - тільки логуємо
    if (zapierSettings.testMode) {
      console.log('=== ZAPIER TEST MODE ===')
      console.log('Would send to Zapier:', JSON.stringify(zapierPayload, null, 2))
      console.log('Webhook URL:', zapierSettings.webhookURL)
      console.log('========================')
      return true
    }

    // Відправляємо в Zapier
    const response = await fetch(zapierSettings.webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zapierPayload)
    })

    if (!response.ok) {
      throw new Error(`Zapier webhook failed: ${response.status} ${response.statusText}`)
    }

    console.log(`✅ Zapier notification sent for ${operation} on ${collection}`)
    return true

  } catch (error) {
    console.error('❌ Failed to send Zapier notification:', error)
    return false
  }
}

export const createZapierHooks = (collectionSlug: string) => ({
  afterChange: [
    (async ({ doc, previousDoc, operation, req }) => {
      await sendToZapier(collectionSlug, operation, doc, req, previousDoc)
    }) as CollectionAfterChangeHook
  ],
  afterDelete: [
    (async ({ doc, req }) => {
      await sendToZapier(collectionSlug, 'delete', doc, req)
    }) as CollectionAfterDeleteHook
  ]
})

