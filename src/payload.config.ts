// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { CategoriesPosts } from './collections/CategoriesPosts'
import { MainInfo } from './collections/Main'
import { Menu } from './collections/Menu'
import { Pages } from './collections/Pages'
import { FAQ } from '@/collections/FAQ'
import { buildConfig } from 'payload'

import { OrderCall } from '@/endpoints/OrderCall'
import { OrderCallFull } from '@/endpoints/OrderCallFull'
import Applications from '@/collections/Applications'
import applicationCategory from '@/collections/categories/applicationCategory'

import { GetCalculate } from '@/endpoints/GetCalculate'
import { zapierPlugin } from '@payloadcms/plugin-zapier'
import ZapierSettings from '@/globals/ZapierSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [MainInfo, Menu, ZapierSettings],
  collections: [
    applicationCategory,
    Users,
    Media,
    Posts,
    CategoriesPosts,
    Pages,
    FAQ,
    Applications,
  ],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Ukrainian',
        code: 'ua',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} — INTEGRITY`,
      generateDescription: ({ doc }) => doc.description,
      generateURL: ({ doc, collectionSlug }) => {
        return `https://www.integritymarketing.systems/${collectionSlug}/${doc.slug}`
      },
      tabbedUI: true,
    }),
  ],
  endpoints: [OrderCall, OrderCallFull, GetCalculate],
})
