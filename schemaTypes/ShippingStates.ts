import {defineField, defineType} from 'sanity'

export const deliveryStates = defineType({
  name: 'shipping_states',
  title: 'Shipping States',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'State Name',
      type: 'string',
    }),
    defineField({
      name: 'zone',
      title: 'Zone',
      type: 'reference',
      to: [{type: 'shipping_zone'}]
    }),
  ],
})