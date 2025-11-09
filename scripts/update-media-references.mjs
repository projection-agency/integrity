import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.join(__dirname, '../src')
const publicDir = path.join(__dirname, '../public')

// Функція для рекурсивного пошуку файлів
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx', '.json']) {
  const files = []

  function scan(currentDir) {
    const items = fs.readdirSync(currentDir)

    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scan(fullPath)
      } else if (stat.isFile() && extensions.some((ext) => item.endsWith(ext))) {
        files.push(fullPath)
      }
    }
  }

  scan(dir)
  return files
}

// Функція для оновлення посилань на медіа
function updateMediaReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let updated = false

    // Патерни для пошуку посилань на S3 медіа
    const patterns = [
      // S3 URL патерни
      {
        regex: /https:\/\/[^\/]+\.s3\.[^\/]+\.amazonaws\.com\/media\/([^"'\s]+)/g,
        replacement: '/media/$1',
      },
      // Payload media посилання
      {
        regex: /(media\.url|media\.filename|media\.sizes\.[^.]+\.url)/g,
        replacement: (match) => {
          // Замінюємо на локальні шляхи
          return match.replace(/\.url/g, '.localPath')
        },
      },
      // Прямі посилання на S3
      {
        regex: /s3:\/\/[^\/]+\/media\/([^"'\s]+)/g,
        replacement: '/media/$1',
      },
    ]

    // Застосовуємо кожен патерн
    for (const pattern of patterns) {
      const newContent = content.replace(pattern.regex, pattern.replacement)
      if (newContent !== content) {
        content = newContent
        updated = true
      }
    }

    // Якщо файл був оновлений, записуємо його
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8')
      return true
    }

    return false
  } catch (error) {
    console.error(`❌ Помилка оновлення файлу ${filePath}:`, error.message)
    return false
  }
}

async function updateAllMediaReferences() {
  try {
    console.log('🔄 Оновлюю посилання на медіа в коді...')

    // Знаходимо всі файли для оновлення
    const files = findFiles(srcDir)
    console.log(`📁 Знайдено ${files.length} файлів для перевірки`)

    let updatedFiles = 0

    // Оновлюємо кожен файл
    for (const file of files) {
      const relativePath = path.relative(process.cwd(), file)

      if (updateMediaReferences(file)) {
        console.log(`✅ Оновлено: ${relativePath}`)
        updatedFiles++
      }
    }

    console.log('\n🎉 Оновлення посилань завершено!')
    console.log(`📊 Статистика:`)
    console.log(`   - Оновлено файлів: ${updatedFiles}`)
    console.log(`   - Перевірено файлів: ${files.length}`)

    if (updatedFiles > 0) {
      console.log('\n⚠️  Важливо:')
      console.log('1. Перевірте, чи правильно працюють всі медіа файли')
      console.log('2. Протестуйте основні функції сайту')
      console.log('3. Переконайтеся, що всі зображення відображаються')
    } else {
      console.log('\nℹ️  Зміни не знайдено - можливо, посилання вже локальні')
    }
  } catch (error) {
    console.error('❌ Помилка оновлення посилань:', error)
  }
}

// Запускаємо скрипт
updateAllMediaReferences()
