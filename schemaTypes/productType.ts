import {defineField, defineType, defineArrayMember} from 'sanity'
import units from './units'

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
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the product',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (in naira)',
      type: 'number',
      description: 'The retail price of the product in Nigerian Naira',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Categories to which this product belongs',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      description: 'Collections that include this product',
      of: [{type: 'reference', to: {type: 'collection'}}],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Product images gallery',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A brief summary of the product',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      description: 'In-depth product information and specifications',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      description: 'List of notable product features',
      of: [defineArrayMember({type: 'string'})],
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
              description: 'Stock Keeping Unit identifier',
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'reference',
              to: [{type: 'size'}],
              description: 'Reference to a predefined size',
            }),
            defineField({
              name: 'color',
              title: 'Color',
              type: 'reference',
              to: [{type: 'color'}],
              description: 'Reference to a predefined color',
            }),
            defineField({
              name: 'stock',
              title: 'Stock Level',
              type: 'number',
              description: 'Number of items available in stock',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'weight',
              title: 'Product Weight',
              type: 'object',
              description: 'Weight of variant used to process shipping/delivery rate',
              fields: [
                defineField({
                  name: 'value',
                  title: 'Weight value',
                  type: 'number',
                  description: 'Value of weight in unit',
                  validation: (Rule) => Rule.min(0),
                }),

                defineField({
                  name: 'unit',
                  title: 'Weight unit',
                  type: 'string',
                  description: 'Unit for item weight',
                  options: {
                    list: units,
                    layout: 'radio',
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      readOnly: true,
      description: 'Average customer rating for this product',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Optional searchable tags (e.g. "denim", "linen")',
      of: [defineArrayMember({type: 'string'})],
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
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for SEO (max 160 chars)',
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      imageUrl: 'images[0]',
      price: 'price',
      variants: 'variants',
    },
    prepare({title, imageUrl, price, variants}) {
      const variantsCount = variants?.length || 0
      return {
        title: title || 'Untitled Product',
        subtitle: `₦${price?.toLocaleString() || 0} • ${variantsCount} variant${variantsCount === 1 ? '' : 's'}`,
        media: imageUrl,
      }
    },
  },
})
