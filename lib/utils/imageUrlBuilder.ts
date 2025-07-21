import imgUrlBuild from '@sanity/image-url'
import {ImageUrlBuilderOptions, SanityImageObject} from '@sanity/image-url/lib/types/types'
import environment from '../../exp'

const builder = imgUrlBuild({
  projectId: environment.PID,
  dataset: environment.DATASET,
})

export default function imageUrlBuilder(
  assets: SanityImageObject[],
  options?: ImageUrlBuilderOptions,
) {
  return assets.map((asset) => {
    let imageObj = builder.image(asset.asset._ref)
    if (options) {
      // go through each { key: value } they passed you
      Object.entries(options).forEach(([key, val]) => {
        // only apply if it isn’t null/undefined
        if (val != null) {
          const methodName = key as keyof ImageUrlBuilderOptions
          // @ts-expect-error dynamic access
          if (methodName && typeof imageObj[methodName] === 'function') {
            // @ts-expect-error dynamic call
            imageObj = imageObj[methodName](val)
          }
        }
      })
    }
    return imageObj.url()
  })
}
