import { serialize, SkipSerialization } from 'serialize'
import { isDate, isUndefined } from 'lodash'

export function nextServerSideSerialize(data: Record<string, unknown>) {
  return serialize(data, (unserializedData) => {
    if (isDate(unserializedData)) {
      return unserializedData.toLocaleString()
    } else if (isUndefined(unserializedData)) {
      return null
    } else if (unserializedData instanceof URL) {
      return unserializedData.toString()
    } else {
      return SkipSerialization
    }
  })
}
