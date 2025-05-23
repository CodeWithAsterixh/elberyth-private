// schemas/color.ts
import { defineField, defineType } from 'sanity';
export const colorType = defineType({
  name: 'color',
  title: 'Color',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Human-readable color name',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hex',
      title: 'Hex Code',
      type: 'string',
      description: 'Hexadecimal color code (e.g. #FF5733)',
      validation: Rule => Rule.required().regex(/^#([0-9A-F]{3}){1,2}$/i)
    }),
    defineField({
      name: 'rgba',
      title: 'RGBA',
      type: 'string',
      description: 'RGBA color value (e.g. rgba(255,87,51,0.5))',
      // No validation needed; field is optional by default
    })
  ]
});


