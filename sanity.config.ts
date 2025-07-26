import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import environment from './exp'
import { deskItemBuilder, deskStructure } from './lib/plugins/desk'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Elberyth',
  projectId: environment.PID,
  dataset: environment.DATASET,

  plugins: [
    structureTool({
      structure: deskStructure([
        {
          title: 'Products',
          schemaTypes: ['product', 'collection', 'category'],
          builders: (S) => [
            deskItemBuilder(S, {
              docTitle: 'Cloth Products',
              filterField: 'productType',
              filterId: 'cloth',
              schemaType: 'product',
            }),
            deskItemBuilder(S, {
              docTitle: 'Skincare Products',
              filterField: 'productType',
              filterId: 'skincare',
              schemaType: 'product',
            }),
          ],
        },
        {
          title: 'Delivery information',
          schemaTypes: ['shipping_states', 'shipping_zone'],
          builders: () => [],
        },
        {
          title: 'Product features',
          schemaTypes: ['material', 'color', 'size'],
          builders: () => [],
        },
      ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
