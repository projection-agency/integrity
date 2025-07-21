# 🧩 StyledTextComponent — Custom Field for Payload CMS

Цей репозиторій містить кастомне поле для [Payload CMS](https://payloadcms.com/), яке дозволяє редагувати текст у текстовому полі.

---

## 📁 Структура 

```
sl_StyledText/
├── index.ts
└── components/
├── StyledTextComponent.module.css
├── StyledTextComponent.tsx
├── st_styles.css
├── Buttons/
│   ├── ButtonBold/
│   │   ├── ButtonBold.module.css
│   │   └── ButtonBold.tsx
│   ├── ButtonColor/
│   │   ├── ButtonColor.module.css
│   │   └── ButtonColor.tsx
│   ├── ButtonItalic/
│   │   ├── ButtonItalic.module.css
│   │   └── ButtonItalic.tsx
│   └── ButtonSwitch/
│       ├── ButtonSwitch.module.css
│       ├── ButtonSwitch.tsx
│       └── checkClick.ts
├── FullTextArea/
│   ├── FullTextArea.module.css
│   └── FullTextArea.tsx
├── PreviewArea/
│   ├── PreviewArea.module.css
│   └── PreviewArea.tsx
└── ST_Header/
├── ST_Header.module.css
└── ST_Header.tsx
```
---
## 🛠 Використання
1. Імпорт компонента
   ``` import { StyledText } from '@/{path_to___sl_StyledText}}'```
2. Використання компонента
   ```
   {
   name: 'customField',
   label: { en: 'Моє кастомне поле' },
   type: 'text',
   required: false,
   admin: {
   components: {
   Field: StyledText,
   },
   },
   },
   ```