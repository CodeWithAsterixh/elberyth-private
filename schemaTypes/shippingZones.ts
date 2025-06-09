import {defineField, defineType} from 'sanity'
import units from './units'

export const deliveryZones = defineType({
  name: 'shipping_zone',
  title: 'Shipping Zones',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Zone name',
      type: 'string',
    }),
    defineField({
      name: 'rates',
      title: 'Zone rates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'amount',
              title: 'Amount per single unit',
              type: 'number',
            }),
            defineField({
              name: 'unit',
              title: 'Rate unit',
              type: 'string',
              description: 'Unit for current',
              options: {
                list: units,
                layout: 'radio',
              },
            }),
          ],
        },
      ],
    }),
  ],
})
