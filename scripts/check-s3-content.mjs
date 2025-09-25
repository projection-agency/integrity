import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

// Завантажуємо змінні середовища
dotenv.config()

// Налаштування S3 клієнта
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  // Використовуємо стандартний AWS S3 endpoint
  // forcePathStyle: true, // Видаляємо це для стандартного AWS S3
})

const bucketName = process.env.S3_BUCKET_NAME

async function checkS3Content() {
  try {
    console.log('🔍 Перевіряю вміст S3 bucket...\n')

    // Перевіряємо змінні середовища
    if (
      !bucketName ||
      !process.env.AWS_REGION ||
      !process.env.S3_ACCESS_KEY_ID ||
      !process.env.S3_SECRET_ACCESS_KEY
    ) {
      console.error('❌ Відсутні необхідні змінні середовища для S3')
      return
    }

    console.log(`📦 Bucket: ${bucketName}`)
    console.log(`🌍 Регіон: ${process.env.AWS_REGION}`)
    console.log('='.repeat(50))

    // Отримуємо список всіх об'єктів у S3
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 1000, // Максимальна кількість об'єктів для перегляду
    })

    const listResponse = await s3Client.send(listCommand)

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      console.log('ℹ️  S3 bucket порожній')
      return
    }

    console.log(`📁 Знайдено ${listResponse.Contents.length} об'єктів у S3\n`)

    // Групуємо об'єкти за префіксами
    const prefixes = {}

    for (const object of listResponse.Contents) {
      const key = object.Key
      const prefix = key.split('/')[0] || 'root'

      if (!prefixes[prefix]) {
        prefixes[prefix] = []
      }
      prefixes[prefix].push({
        key: key,
        size: object.Size,
        lastModified: object.LastModified,
      })
    }

    // Виводимо структуру
    for (const [prefix, objects] of Object.entries(prefixes)) {
      console.log(`📁 ${prefix}/ (${objects.length} файлів)`)

      // Показуємо перші 5 файлів
      objects.slice(0, 5).forEach((obj) => {
        const size = obj.size ? `${(obj.size / 1024).toFixed(1)} KB` : '0 KB'
        const date = obj.lastModified ? obj.lastModified.toLocaleDateString() : 'N/A'
        console.log(`   📄 ${obj.key} (${size}, ${date})`)
      })

      if (objects.length > 5) {
        console.log(`   ... та ще ${objects.length - 5} файлів`)
      }
      console.log()
    }

    // Перевіряємо, чи є медіа файли
    const mediaFiles = listResponse.Contents.filter(
      (obj) =>
        obj.Key && (obj.Key.startsWith('integritystorage/media/') || obj.Key.includes('media')),
    )

    if (mediaFiles.length > 0) {
      console.log(`🎯 Знайдено ${mediaFiles.length} медіа файлів`)
      console.log('✅ Можна виконувати міграцію')
    } else {
      console.log('ℹ️  Медіа файли не знайдено')
      console.log('💡 Можливо, вони знаходяться в іншій папці або у вас немає медіа файлів у S3')
    }
  } catch (error) {
    console.error('❌ Помилка перевірки S3:', error.message)

    if (error.Code === 'NoSuchBucket') {
      console.log('💡 Bucket не існує або у вас немає доступу')
    } else if (error.Code === 'AccessDenied') {
      console.log('💡 Перевірте права доступу до bucket')
    }
  }
}

// Запускаємо скрипт
checkS3Content()
