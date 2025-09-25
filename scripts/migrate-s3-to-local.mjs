import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 Починаю міграцію медіа з S3 на локальне сховище...\n')

async function runMigration() {
  try {
    // Крок 1: Завантаження медіа з S3
    console.log('📥 Крок 1: Завантаження медіа з S3...')
    try {
      execSync('pnpm run download:media', { stdio: 'inherit' })
      console.log('✅ Медіа успішно завантажено з S3\n')
    } catch (error) {
      console.error('❌ Помилка завантаження медіа:', error.message)
      console.log('⚠️  Перевірте змінні середовища для S3 та спробуйте знову')
      return
    }

    // Крок 2: Пропускаємо встановлення localStorage (використовується вбудоване)
    console.log('📦 Крок 2: Перевіряю налаштування...')
    console.log('✅ Payload має вбудовану підтримку локального сховища\n')

    // Крок 3: Оновлення конфігурації Payload
    console.log('⚙️  Крок 3: Оновлення конфігурації Payload...')
    try {
      execSync('pnpm run update:config', { stdio: 'inherit' })
      console.log('✅ Конфігурація Payload оновлена\n')
    } catch (error) {
      console.error('❌ Помилка оновлення конфігурації:', error.message)
      return
    }

    // Крок 4: Оновлення посилань на медіа в коді
    console.log('🔗 Крок 4: Оновлення посилань на медіа в коді...')
    try {
      execSync('pnpm run update:references', { stdio: 'inherit' })
      console.log('✅ Посилання на медіа оновлено\n')
    } catch (error) {
      console.error('❌ Помилка оновлення посилань:', error.message)
      return
    }

    console.log('🎉 Міграція завершена успішно!\n')
    console.log('📋 Наступні кроки:')
    console.log('1. Перезапустіть сервер розробки')
    console.log('2. Перевірте, чи всі медіа файли відображаються')
    console.log('3. Протестуйте основні функції сайту')
    console.log('4. Переконайтеся, що всі зображення завантажуються')

    console.log('\n⚠️  Важливо:')
    console.log('- Резервна копія payload.config.ts збережена як payload.config.ts.backup')
    console.log('- Всі медіа файли тепер знаходяться в public/media/')
    console.log('- Якщо щось піде не так, можете повернутися до S3, використовуючи резервну копію')
  } catch (error) {
    console.error('❌ Критична помилка під час міграції:', error)
  }
}

// Запускаємо міграцію
runMigration()
