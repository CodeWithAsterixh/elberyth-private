import {defineArrayMember, defineField, defineType} from 'sanity'



export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'price',
      title: 'Price (in cents)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'availableSizes',
      title: 'Available Sizes',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      },
    }),
    defineField({
      name: 'availableColors',
      title: 'Available Colors',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'rating',
      title: 'Customer Rating',
      type: 'number', // single value
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'dropdown', // or 'radio' for buttons
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
    },
  },
})

