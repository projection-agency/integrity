import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const payloadConfigPath = path.join(__dirname, '../src/payload.config.ts')
const backupPath = path.join(__dirname, '../src/payload.config.ts.backup')

async function updatePayloadConfig() {
  try {
    console.log('🔄 Оновлюю конфігурацію Payload...')

    // Створюємо резервну копію
    if (fs.existsSync(payloadConfigPath)) {
      fs.copyFileSync(payloadConfigPath, backupPath)
      console.log('✅ Створено резервну копію payload.config.ts')
    }

    // Читаємо поточну конфігурацію
    let configContent = fs.readFileSync(payloadConfigPath, 'utf8')

    // Видаляємо імпорт S3 storage
    const s3StorageImport = "import { s3Storage } from '@payloadcms/storage-s3'"

    if (configContent.includes(s3StorageImport)) {
      configContent = configContent.replace(s3StorageImport, '')
      console.log('✅ Видалено імпорт S3 storage')
    }

    // Замінюємо S3 конфігурацію на локальну
    const s3Config = `    s3Storage({
      bucket: process.env.S3_BUCKET_NAME!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.AWS_REGION!,
        forcePathStyle: true,
        endpoint: \`https://\${process.env.S3_BUCKET_NAME}.s3.\${process.env.AWS_REGION}.amazonaws.com\`,
      },
      collections: {
        media: {
          prefix: 'media',
        },
      },
      disableLocalStorage: true,
    })`

    const localConfig = `    // Видалено S3 storage - використовується вбудоване локальне сховище`

    if (configContent.includes(s3Config)) {
      configContent = configContent.replace(s3Config, localConfig)
      console.log('✅ Замінено S3 конфігурацію на localStorage')
    }

    // Записуємо оновлену конфігурацію
    fs.writeFileSync(payloadConfigPath, configContent, 'utf8')
    console.log('✅ Конфігурація Payload оновлена')

    console.log('\n📝 Що було змінено:')
    console.log('- Замінено S3 storage на localStorage')
    console.log('- Видалено S3 налаштування')
    console.log('- Створено резервну копію payload.config.ts.backup')

    console.log('\n⚠️  Не забудьте:')
    console.log('1. Встановити @payloadcms/storage-local: pnpm add @payloadcms/storage-local')
    console.log('2. Перезапустити сервер після змін')
    console.log('3. Перевірити, чи всі медіа файли доступні локально')
  } catch (error) {
    console.error('❌ Помилка оновлення конфігурації:', error)
  }
}

// Запускаємо скрипт
updatePayloadConfig()
