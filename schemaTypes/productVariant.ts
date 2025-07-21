// schemas/variant.ts
import { defineArrayMember, defineField } from 'sanity'
import { generateAccessibleColorPair } from '../lib/helpers/color_generator'
import { createColorSwatchDataUrl } from '../lib/helpers/color_swatch'
import units from './units'

export const variantType = defineField({
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

        defineField({
          name: 'price',
          title: 'Price (in naira)',
          type: 'number',
          description: 'The retail price of the product in Nigerian Naira',
          validation: (Rule) => Rule.required().min(0),
        }),
      ],
      preview: {
        select: {
          sku: 'sku',
          stock: 'stock',
        },
        prepare({sku, stock}) {
            const {primary,text} = generateAccessibleColorPair()
            const previewImg = createColorSwatchDataUrl(primary,32,0,sku.at(0)?.toUpperCase(),text)
          return {
            title: sku,
            subtitle: stock,
            imageUrl:previewImg
          }
        },
      },
    }),
  ],
})
