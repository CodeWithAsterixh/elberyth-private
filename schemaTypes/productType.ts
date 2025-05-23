import {defineField, defineType, defineArrayMember} from 'sanity'

// 1. Category schema (for grouping products)
export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 50 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
    })
  ],
  preview: {
    select: { title: 'name', media: 'mainImage' }
  }
})

// 2. Collection schema (e.g. seasonal, editorial, curated groups)
export const collectionType = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 100 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}]
        })
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'priority',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.integer().min(0)
    })
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' }
  }
})

// 3. Enhanced Product schema
export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: Rule => Rule.required().min(2) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'price', title: 'Price (in naira)', type: 'number', validation: Rule => Rule.required().min(0) }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: { type: 'category' } }], validation: Rule => Rule.required().min(1) }),
    defineField({ name: 'collections', title: 'Collections', type: 'array', of: [{ type: 'reference', to: { type: 'collection' } }] }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true } })], validation: Rule => Rule.required().min(1) }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', validation: Rule => Rule.required().max(200) }),
    defineField({ name: 'details', title: 'Details', type: 'blockContent' }),
    defineField({ name: 'features', title: 'Key Features', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'variants', title: 'Variants', type: 'array', of: [
      defineArrayMember({
        type: 'object',
        name: 'variant',
        fields: [
          defineField({ name: 'sku', title: 'SKU', type: 'string' }),
          defineField({ name: 'size', title: 'Size', type: 'string', options: { list: ['XS','S','M','L','XL','XXL'] }}),
          defineField({ name: 'color', title: 'Color', type: 'string' }),
          defineField({ name: 'stock', title: 'Stock Level', type: 'number', validation: Rule => Rule.min(0) })
        ]
      })
    ]}),
    defineField({ name: 'rating', title: 'Average Rating', type: 'number', readOnly: true }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [defineArrayMember({ type: 'string' })], description: 'Optional searchable tags (e.g. "denim", "linen")' }),
    defineField({ name: 'metadata', title: 'SEO Metadata', type: 'object', fields: [
      defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', validation: Rule => Rule.max(60) }),
      defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', validation: Rule => Rule.max(160) })
    ]})
  ],
  preview: { select: { title: 'name', media: 'images.0' } }
})

// Note: "blockContent" refers to a rich text schema (e.g. from a shared portableText schema).
