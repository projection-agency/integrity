import dotenv from 'dotenv'

// Завантажуємо змінні середовища
dotenv.config()

console.log('🔍 Перевіряю змінні середовища для S3...\n')

const requiredVars = ['S3_BUCKET_NAME', 'AWS_REGION', 'S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY']

let allVarsPresent = true

for (const varName of requiredVars) {
  const value = process.env[varName]
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 10)}...`)
  } else {
    console.log(`❌ ${varName}: відсутній`)
    allVarsPresent = false
  }
}

console.log('\n' + '='.repeat(50))

if (allVarsPresent) {
  console.log('🎉 Всі необхідні змінні середовища налаштовані!')
  console.log('✅ Можна запускати міграцію медіа з S3')
  console.log('\n🚀 Запустіть: pnpm run migrate:media')
} else {
  console.log('❌ Деякі змінні середовища відсутні')
  console.log('⚠️  Перевірте файл .env та спробуйте знову')
}

console.log('='.repeat(50))
