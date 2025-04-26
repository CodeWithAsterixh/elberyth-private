import {defineField, defineType} from 'sanity'

export const SpecialOffers = defineType({
  name: 'special_offers',
  title: 'Special Offers',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['sales', 'featured'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'offerName',
      title: 'Offer Name',
      type: 'string',
    }),
    defineField({
      name: 'offer_slug',
      title: 'offer slug (find product slug and paste the slug here)',
      type: 'string',
    }),
    defineField({
      name: 'offer_description',
      title: 'Offer Description',
      type: 'string',
    }),
    defineField({
      name: 'displayImage',
      title: 'Display Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'sale_start',
      title: 'Sale Start',
      type: 'datetime',
      hidden: ({document}) => document?.category !== 'sales',
    }),
    defineField({
      name: 'sale_end',
      title: 'Sale End',
      type: 'datetime',
      hidden: ({document}) => document?.category !== 'sales',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'displayImage',
    },
  },
})
