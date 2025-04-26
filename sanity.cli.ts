import {defineCliConfig} from 'sanity/cli'
import environment from './exp'
export default defineCliConfig({
  api: {
    projectId: environment.PID,
    dataset: environment.DATASET
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
