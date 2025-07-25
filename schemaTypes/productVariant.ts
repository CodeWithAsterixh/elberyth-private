// schemas/variant.ts
import {defineArrayMember, defineField} from 'sanity'
import {generateAccessibleColorPair} from '../lib/helpers/color_generator'
import {createColorSwatchDataUrl} from '../lib/helpers/color_swatch'
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
      // Default new variants to inherit the product's type
      fields: [
        // GENERAL FIELDS: for both cloth & skincare
        defineField({
          name: 'sku',
          title: 'SKU',
          type: 'string',
          description: 'Unique Stock Keeping Unit',
        }),
        defineField({
          name: 'stock',
          title: 'Stock Level',
          type: 'number',
          description: 'Items available in stock',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'weight',
          title: 'Product Weight',
          type: 'object',
          description: 'Weight for shipping calculations',
          fields: [
            defineField({
              name: 'value',
              title: 'Weight Value',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'unit',
              title: 'Weight Unit',
              type: 'string',
              options: {list: units, layout: 'radio'},
            }),
          ],
        }),
        defineField({
          name: 'price',
          title: 'Price (NGN)',
          type: 'number',
          description: 'Retail price in Nigerian Naira',
          validation: (Rule) => Rule.required().min(0),
        }),
        // CLOTH-ONLY FIELDS
        defineField({
          name: 'size',
          title: 'Size',
          type: 'reference',
          to: [{type: 'size'}],
          description: 'Select a predefined size',
          hidden: ({document}) => document?.productType !== 'cloth',
        }),
        defineField({
          name: 'color',
          title: 'Color',
          type: 'reference',
          to: [{type: 'color'}],
          description: 'Select a predefined color',
          hidden: ({document}) => {
            return document?.productType !== 'cloth'
          },
        }),
        // SKINCARE-ONLY FIELDS
        defineField({
          name: 'volume',
          title: 'Volume',
          type: 'object',
          description: 'Product volume or weight',
          hidden: ({document}) => document?.productType !== 'skincare',
          fields: [
            defineField({
              name: 'value',
              title: 'Amount',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'unit',
              title: 'Unit',
              type: 'string',
              options: {list: ['mL', 'g', 'fl oz'], layout: 'radio'},
            }),
          ],
        }),
        defineField({
          name: 'expiryDate',
          title: 'Expiry Date',
          type: 'date',
          description: 'Expiration date of the product',
          hidden: ({document}) => document?.productType !== 'skincare',
        }),
      ],
      preview: {
        select: {sku: 'sku', stock: 'stock'},
        prepare({sku, stock}) {
          const {primary, text} = generateAccessibleColorPair({text: '#fff'})
          return {
            title: sku,
            subtitle: `Stock: ${stock}`,
            imageUrl: createColorSwatchDataUrl(primary, 32, 0, sku.charAt(0).toUpperCase(), text),
          }
        },
      },
    }),
  ],
})
