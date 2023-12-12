import { serialize, SkipSerialization } from './serialize'

export function nextServerSideSerialize(data: Record<string, unknown>) {
  return serialize(data, (unserializedData) => {
    if (isDate(unserializedData)) {
      return unserializedData.toISOString()
    } else if (isUndefined(unserializedData)) {
      return null
    } else if (unserializedData instanceof URL) {
      return unserializedData.toString()
    } else {
      return SkipSerialization
    }
  })
}

function isDate(value: unknown): value is Date {
  return value instanceof Date
}

function isUndefined(value: unknown): value is undefined {
  return value === undefined
}
