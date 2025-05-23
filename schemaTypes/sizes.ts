import { defineField, defineType } from 'sanity';
export const sizeType = defineType({
  name: 'size',
  title: 'Size',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Size label (e.g. S, M, L, XL)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Optional description for this size'
    })
  ]
});