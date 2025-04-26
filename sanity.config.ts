import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import environment from './exp'

export default defineConfig({
  name: 'default',
  title: 'Elberyth',
  projectId: environment.PID,
  dataset: environment.DATASET,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
