import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Завантажуємо змінні середовища
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
const localMediaDir = path.join(__dirname, '../public/media')

async function downloadS3Media() {
  try {
    console.log('🚀 Починаю завантаження медіа з S3...')

    // Перевіряємо змінні середовища
    if (
      !bucketName ||
      !process.env.AWS_REGION ||
      !process.env.S3_ACCESS_KEY_ID ||
      !process.env.S3_SECRET_ACCESS_KEY
    ) {
      console.error('❌ Відсутні необхідні змінні середовища для S3')
      console.log('Потрібно встановити:')
      console.log('- S3_BUCKET_NAME')
      console.log('- AWS_REGION')
      console.log('- S3_ACCESS_KEY_ID')
      console.log('- S3_SECRET_ACCESS_KEY')
      return
    }

    // Створюємо локальну папку, якщо її немає
    if (!fs.existsSync(localMediaDir)) {
      fs.mkdirSync(localMediaDir, { recursive: true })
      console.log('✅ Створено папку public/media')
    }

    // Отримуємо список всіх об'єктів у S3
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'integritystorage/media/', // Правильний префікс для медіа файлів
    })

    const listResponse = await s3Client.send(listCommand)

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      console.log('ℹ️  У S3 немає медіа файлів для завантаження')
      return
    }

    console.log(`📁 Знайдено ${listResponse.Contents.length} файлів у S3`)

    let downloadedCount = 0
    let skippedCount = 0

    // Завантажуємо кожен файл
    for (const object of listResponse.Contents) {
      const key = object.Key

      // Пропускаємо папки та не медіа файли
      if (key.endsWith('/') || !key.startsWith('integritystorage/media/')) {
        continue
      }

      // Видаляємо префікс 'integritystorage/media/' та отримуємо назву файлу
      const fileName = key.replace('integritystorage/media/', '')
      const localFilePath = path.join(localMediaDir, fileName)

      // Перевіряємо, чи файл вже існує локально
      if (fs.existsSync(localFilePath)) {
        console.log(`⏭️  Пропущено: ${fileName} (вже існує)`)
        skippedCount++
        continue
      }

      try {
        // Завантажуємо файл з S3
        const getCommand = new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        })

        const response = await s3Client.send(getCommand)
        const fileStream = response.Body

        // Зберігаємо файл локально
        const writeStream = fs.createWriteStream(localFilePath)
        fileStream.pipe(writeStream)

        await new Promise((resolve, reject) => {
          writeStream.on('finish', resolve)
          writeStream.on('error', reject)
        })

        console.log(`✅ Завантажено: ${fileName}`)
        downloadedCount++
      } catch (error) {
        console.error(`❌ Помилка завантаження ${fileName}:`, error.message)
      }
    }

    console.log('\n🎉 Завантаження завершено!')
    console.log(`📊 Статистика:`)
    console.log(`   - Завантажено: ${downloadedCount} файлів`)
    console.log(`   - Пропущено: ${skippedCount} файлів`)
    console.log(`   - Загалом: ${listResponse.Contents.length} файлів у S3`)
  } catch (error) {
    console.error('❌ Помилка:', error)
  }
}

// Запускаємо скрипт
downloadS3Media()
