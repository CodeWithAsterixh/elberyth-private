import {defineField, defineType, defineArrayMember} from 'sanity'



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
    defineField({ name: 'details', title: 'Details', type: 'text' }),
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
