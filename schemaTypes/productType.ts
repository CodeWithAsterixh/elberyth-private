import { defineField, defineType, defineArrayMember } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'The name of the product',
      validation: Rule => Rule.required().min(2)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the product',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Price (in naira)',
      type: 'number',
      description: 'The retail price of the product in Nigerian Naira',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Categories to which this product belongs',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      description: 'Collections that include this product',
      of: [{ type: 'reference', to: { type: 'collection' } }]
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Product images gallery',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A brief summary of the product',
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      description: 'In-depth product information and specifications'
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      description: 'List of notable product features',
      of: [defineArrayMember({ type: 'string' })]
    }),
    // Updated variants: reference to new 'size' and 'color' types
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      description: 'Different versions or models of this product',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'variant',
          title: 'Variant',
          fields: [
            defineField({
              name: 'sku',
              title: 'SKU',
              type: 'string',
              description: 'Stock Keeping Unit identifier'
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'reference',
              to: [{ type: 'size' }],
              description: 'Reference to a predefined size'
            }),
            defineField({
              name: 'color',
              title: 'Color',
              type: 'reference',
              to: [{ type: 'color' }],
              description: 'Reference to a predefined color'
            }),
            defineField({
              name: 'stock',
              title: 'Stock Level',
              type: 'number',
              description: 'Number of items available in stock',
              validation: Rule => Rule.min(0)
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      readOnly: true,
      description: 'Average customer rating for this product'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Optional searchable tags (e.g. "denim", "linen")',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'metadata',
      title: 'SEO Metadata',
      type: 'object',
      description: 'Metadata for search engine optimization',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for SEO (max 60 chars)',
          validation: Rule => Rule.max(60)
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for SEO (max 160 chars)',
          validation: Rule => Rule.max(160)
        })
      ]
    })
  ],
  preview: { select: { title: 'name', media: 'images.0' } }
});
