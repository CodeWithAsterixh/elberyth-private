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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rates',
      title: 'Zone rates',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'amount',
              title: 'Rate Amount',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'unitType',
              title: 'Unit Type',
              type: 'string',
              options: {
                list: units.map(unit => ({
                  title: unit.title,
                  value: unit.value
                })),
                layout: 'radio'
              },
              validation: (Rule) => Rule.required(),
            })
          ],
          preview: {
            select: {
              amount: 'amount',
              unit: 'unitType'
            },
            prepare({amount, unit}) {
              return {
                title: `₦${amount?.toLocaleString() || 0} per ${unit?.toUpperCase() || ''}`
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      rates: 'rates'
    },
    prepare({title, rates}) {
      return {
        title,
        subtitle: `${rates?.length || 0} rate${rates?.length === 1 ? '' : 's'} configured`
      }
    }
  }
})