import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mediaDir = path.join(__dirname, '../media')
const publicMediaDir = path.join(__dirname, '../public/media')

console.log('🔍 Перевіряю доступ до медіа файлів...\n')

// Перевіряємо кореневу папку media
if (fs.existsSync(mediaDir)) {
  const files = fs.readdirSync(mediaDir)
  console.log(`✅ Коренева папка media: ${files.length} файлів`)

  // Показуємо перші 5 файлів
  files.slice(0, 5).forEach((file) => {
    const filePath = path.join(mediaDir, file)
    const stats = fs.statSync(filePath)
    const size = (stats.size / 1024).toFixed(1)
    console.log(`   📄 ${file} (${size} KB)`)
  })

  if (files.length > 5) {
    console.log(`   ... та ще ${files.length - 5} файлів`)
  }
} else {
  console.log('❌ Коренева папка media не існує')
}

console.log()

// Перевіряємо public/media
if (fs.existsSync(publicMediaDir)) {
  const files = fs.readdirSync(publicMediaDir)
  console.log(`✅ Папка public/media: ${files.length} файлів`)
} else {
  console.log('❌ Папка public/media не існує')
}

console.log('\n📋 Рекомендації:')
console.log('1. Payload шукає файли в папці, вказаній в staticDir')
console.log('2. Якщо staticDir: "media", файли повинні бути в корені проекту')
console.log('3. Якщо staticDir: "public/media", файли повинні бути в public/media')
console.log('4. Перезапустіть сервер після змін конфігурації')

// Перевіряємо поточну конфігурацію Media
const mediaConfigPath = path.join(__dirname, '../src/collections/Media.ts')
if (fs.existsSync(mediaConfigPath)) {
  const content = fs.readFileSync(mediaConfigPath, 'utf8')
  const staticDirMatch = content.match(/staticDir:\s*['"`]([^'"`]+)['"`]/)

  if (staticDirMatch) {
    console.log(`\n⚙️  Поточна конфігурація Media: staticDir: "${staticDirMatch[1]}"`)

    if (staticDirMatch[1] === 'media') {
      console.log('✅ Конфігурація правильна - файли в кореневій папці media')
    } else if (staticDirMatch[1] === 'public/media') {
      console.log('✅ Конфігурація правильна - файли в public/media')
    } else {
      console.log('⚠️  Нестандартна конфігурація staticDir')
    }
  }
}
